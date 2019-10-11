const visit = require("unist-util-visit");
var util = require("mdast-util-toc");
// const fs = require("fs");
const yaml = require("js-yaml");

const transformer = (markdownAST, pluginOptions) => {
  // fs.writeFileSync("./data-before.json", JSON.stringify(markdownAST, null, 2));

  // find position of TOC
  const index = markdownAST.children.findIndex(
    node => node.type === "code" && node.lang === "toc"
  );

  // we have no TOC
  if (index === -1) {
    return;
  }

  let prefs = {
    ...pluginOptions,
    tight: false,
    "from-heading": 2,
    "to-heading": 6
  };

  try {
    let parsePrefs = yaml.safeLoad(markdownAST.children[index].value);
    prefs = { ...prefs, ...parsePrefs };
  } catch (e) {
    console.log("Can't parse TOC-Configuration", e);
  }

  // this ist the ast we nned consider
  let tocMarkdownAST = {
    ...markdownAST,
    children: []
  };

  let depth;

  // add all headings
  markdownAST.children.forEach(node => {
    if (node.type === "heading" && node.depth > prefs["from-heading"] - 1) {
      tocMarkdownAST.children.push(node);
    }
  });

  // calculate TOC
  var result = util(tocMarkdownAST, {
    maxDepth: prefs["to-heading"],
    tight: prefs.tight,
    skip: prefs.skip
  });

  // insert the TOC≤
  markdownAST.children = [].concat(
    markdownAST.children.slice(0, index),
    result.map,
    markdownAST.children.slice(index + 1)
  );

  // fs.writeFileSync("./data-after.json", JSON.stringify(markdownAST, null, 2));
};

module.exports = ({ markdownAST }, pluginOptions) => {
  return transformer(markdownAST, pluginOptions);
};
