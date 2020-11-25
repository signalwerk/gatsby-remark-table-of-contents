/* globals test describe  expect */
import remark from "remark";
import gatsbyTOC from ".";

const MD = [
  `
# Headlinge 1.0.0

## Table of Contents
`,

  `
## Headline 1.1.0

### Headline 1.1.1
#### Headline 1.1.1.0

## Headline 1.2.0
`,
];

const mdDefaultPrefs = () => `
${MD[0]}

\`\`\`toc
# This code block gets replaced with the TOC
\`\`\`

${MD[1]}
`;

const mdYamlPrefs = ({
  exclude,
  tight,
  ordered,
  fromHeading,
  toHeading,
  className,
}) => `
${MD[0]}

\`\`\`toc
# This code block gets replaced with the TOC
exclude: ${exclude || "NOTING"}
tight: ${tight ? "true" : "false"}
ordered: ${ordered ? "true" : "false"}
from-heading: ${fromHeading || 2}
to-heading: ${toHeading || 6}
class-name: "${className || "toc"}"
\`\`\`

${MD[1]}
`;

const toc = (config) => {
  return (markdownAST) => {
    gatsbyTOC(
      { markdownAST },
      {
        exclude: "NOTING",
        tight: false,
        fromHeading: 2,
        toHeading: 6,
        className: "toc",
        ...(config || {}),
      }
    );
  };
};

describe("TOC function", () => {
  test("Don't do TOC if not asked for it", async () => {
    const data = await remark().use(toc).process("# h1# h2");
    expect(data.contents.trim()).toEqual("# h1# h2");
  });

  test("illegal toc-definition should not throw an error but take defaults", async () => {
    const spy = jest.spyOn(console, "log").mockImplementation();

    const data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ exclude: "Table of Contents\n-a" }));
    expect(data.contents).toMatchSnapshot();

    expect(console.log).toBeCalled();

    spy.mockRestore();
  });

  test("exclude to exclude header", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ exclude: "Table of Contents" }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ exclude: "Table of Contents" }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ exclude: "Headline 1.1.1" }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ exclude: "Headline 1.1.1" }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    // exclude array
    data = await remark()
      .use(toc)
      .process(
        mdYamlPrefs({ exclude: "['Table of Contents', 'Headline 1.1.1']" })
      );
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ exclude: ["Table of Contents", "Headline 1.1.1"] }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });

  test("tight to tight toc", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ tight: true }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ tight: true }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ tight: false }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ tight: false }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });

  test("ordered to ordered toc", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ ordered: true }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ ordered: true }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ tight: true, ordered: true }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ tight: true, ordered: true }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });

  test("fromHeading to skip headings", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ fromHeading: 1 }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ fromHeading: 1 }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ fromHeading: 2 }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ fromHeading: 2 }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });

  test("toHeading to skip headings", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ fromHeading: 1, toHeading: 2 }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ fromHeading: 1, toHeading: 2 }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ fromHeading: 1, toHeading: 3 }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ fromHeading: 1, toHeading: 3 }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });

  test("set class of toc", async () => {
    let data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ className: "my-toc my-toc--mod" }));
    expect(data.contents).toMatchSnapshot();

    let dataPref = await remark()
      .use(() => toc({ className: "my-toc my-toc--mod" }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);

    // illegal class-name
    data = await remark()
      .use(toc)
      .process(mdYamlPrefs({ className: "my-toc my-toc--$" }));
    expect(data.contents).toMatchSnapshot();

    dataPref = await remark()
      .use(() => toc({ className: "my-toc my-toc--$" }))
      .process(mdDefaultPrefs());

    expect(data.contents).toEqual(dataPref.contents);
  });
});
