var remark = require("remark");
var gatsbyTOC = require("../");
const fs = require("fs");

let data = fs.readFileSync("./test.md");

const toc = () => {
  return markdownAST => {
    fs.writeFileSync(
      "./data-before.json",
      JSON.stringify(markdownAST, null, 2)
    );
    gatsbyTOC(
      { markdownAST },
      {
        exclude: "Table of Contents",
        tight: false,
        fromHeading: 1,
        toHeading: 6
      }
    );
    fs.writeFileSync("./data-after.json", JSON.stringify(markdownAST, null, 2));
  };
};

remark()
  .use(toc)
  .process(data, function(err, file) {
    if (err) throw err;
    console.log(String(file));
  });
