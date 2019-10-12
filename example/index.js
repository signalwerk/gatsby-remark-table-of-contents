var remark = require("remark");
var gatsbyTOC = require("../");

const fs = require("fs");

let data = fs.readFileSync("./test.md");

const toc = () => {
  return markdownAST =>
    gatsbyTOC(
      { markdownAST },
      {
        skip: "Table of Contents",
        tight: false,
        fromHeading: 1,
        toHeading: 6
      }
    );
};

remark()
  .use(toc)
  .process(data, function(err, file) {
    if (err) throw err;
    console.log(String(file));
  });
