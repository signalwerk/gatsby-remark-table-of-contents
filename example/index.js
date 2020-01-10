var remark = require("remark");
var gatsbyTOC = require("../");
const fs = require("fs");

let writeSnapshots = testName => {
  let data = fs.readFileSync(`./tests/${testName}/in.md`);
  const toc = () => {
    return markdownAST => {
      fs.writeFileSync(
        `./tests/${testName}/snapshots/data-before.json`,
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
      fs.writeFileSync(
        `./tests/${testName}/snapshots/data-after.json`,
        JSON.stringify(markdownAST, null, 2)
      );
    };
  };

  remark()
    .use(toc)
    .process(data, function(err, file) {
      if (err) throw err;
      // console.log(String(file));
      fs.writeFileSync(`./tests/${testName}/snapshots/data-out.md`, String(file));
    });
};

writeSnapshots("single-excludes");
writeSnapshots("multiple-excludes");
