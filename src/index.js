import { keysToCamel } from "./util/toCamel";

const util = require("mdast-util-toc");

// todo: as soon as js-yaml version 4 is out
// we can import a three-shaked version
// https://github.com/nodeca/js-yaml/pull/558
const yaml = require("js-yaml");

const defaultPrefs = {
  tight: false,
  fromHeading: 2,
  toHeading: 6,
  className: "toc",
  ordered: false,
};

const parsePrefs = (prefsStrYaml) => {
  try {
    return yaml.safeLoad(prefsStrYaml);
  } catch (e) {
    console.log("Can't parse TOC-Configuration", e);
    return {};
  }
};

const transformer = (markdownAST, pluginOptions) => {
  // find position of TOC
  const index = markdownAST.children.findIndex(
    (node) => node.type === "code" && node.lang === "toc"
  );

  // we have no TOC
  if (index === -1) {
    return;
  }

  const prefs = {
    ...defaultPrefs,
    ...keysToCamel(pluginOptions),
    ...keysToCamel(parsePrefs(markdownAST.children[index].value)),
  };

  // For XSS safety, we only allow basic css names
  if (!prefs.className.match(/^[ a-zA-Z0-9_-]*$/)) {
    prefs.className = "toc";
  }

  // this ist the ast we nned consider
  const tocMarkdownAST = {
    ...markdownAST,
    children: [],
  };

  // add all headings
  markdownAST.children.forEach((node) => {
    if (node.type === "heading" && node.depth > prefs.fromHeading - 1) {
      tocMarkdownAST.children.push(node);
    }
  });

  // calculate TOC
  const result = util(tocMarkdownAST, {
    maxDepth: prefs.toHeading,
    tight: prefs.tight,
    ordered: prefs.ordered,
    skip: Array.isArray(prefs.exclude)
      ? prefs.exclude.join("|")
      : prefs.exclude,
  });

  // insert the TOC
  // eslint-disable-next-line
  markdownAST.children = [].concat(
    markdownAST.children.slice(0, index),
    [{
      type: "parent",
      children: [
        {
          type: "heading",
          depth: 3,
          children: [{ type: "text", value: "Table of Contents" }],
        },
        result.map,
      ],
      data: {
        hProperties: { className: "toc" },
      },
    }],
    markdownAST.children.slice(index + 1)
  );
};

export default (
  { markdownAST, markdownNode: { internal: { type } = {} } = {} },
  pluginOptions
) => {
  return transformer(markdownAST, {
    mdx: type && type.toLowerCase() === "mdx",
    ...pluginOptions,
  });
};
