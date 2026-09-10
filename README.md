# Table of Contents in Gatsby

[![Downloads][downloads-badge]][downloads] ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)

[Gatsby][gatsby] plugin that replaces a fenced `toc` code block in Markdown with a linked table of contents generated from the document’s headings.

## Installation

### Requirements

Use this plugin with `gatsby-transformer-remark` to render Markdown. It requires [gatsby-remark-autolink-headers](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/) to add the heading IDs that the table-of-contents links point to.

```sh
npm install gatsby-transformer-remark gatsby-remark-autolink-headers
```

### Install gatsby-remark-table-of-contents

```sh
npm install gatsby-remark-table-of-contents
```

### Global configuration

Add both Remark plugins to `gatsby-transformer-remark` in `gatsby-config.js`. This example assumes your Markdown files are already sourced with `gatsby-source-filesystem`.

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
  ],
};
```

## Usage

Place a fenced `toc` code block where the table of contents should appear. The plugin replaces the first such block with a list of links to matching headings throughout the document. Documents without a `toc` block are unchanged.

````md
```toc
# This code block gets replaced with the TOC
```
````

To override global settings for this table of contents, add YAML options inside the block. Both camelCase (`fromHeading`) and kebab-case (`from-heading`) option names are supported. Omitted options keep their global settings or plugin defaults:

````md
```toc
# This code block gets replaced with the TOC
exclude: Table of Contents
tight: false
ordered: false
from-heading: 2
to-heading: 6
class-name: "table-of-contents"
```
````

## Options

All options are optional.

### `exclude`

`string | string[]` — default: no exclusions

Exclude headings whose full text matches a case-insensitive regular expression. For example, `exclude: "Table of Contents"` keeps that heading out of the generated list.

An array excludes multiple patterns, for example `exclude: ["Table of Contents", "Appendix"]`. Patterns are combined as `new RegExp('^(' + patterns.join('|') + ')$', 'i')`, so regular-expression characters have their usual meaning. Excluded headings remain in the document.

### `tight`

`boolean` — default: `false`

Controls whether the generated list is **tight** or **loose** in Markdown terms:

- `true`: render each item’s link directly inside `<li>`, without a wrapping `<p>` element.
- `false`: wrap each item’s link in a `<p>` element inside `<li>`.

For example, the same entry renders as:

```html
<!-- tight: true -->
<li><a href="#getting-started">Getting started</a></li>

<!-- tight: false (default) -->
<li><p><a href="#getting-started">Getting started</a></p></li>
```

Use `tight: true` for compact navigation lists. With `false`, your theme’s paragraph margins may add space between entries; the actual spacing depends on your CSS. This option does not change which headings are included or how they are nested, and it works with both ordered and unordered lists.

### `ordered`

`boolean` — default: `false`

Use `true` for a numbered list (`<ol>`) or `false` for a bulleted list (`<ul>`).

### `fromHeading`

`number` — default: `2`

Minimum heading level to include, inclusive, from `1` to `6`. For example, `2` includes `##` headings and deeper levels, while omitting `#` headings.

### `toHeading`

`number` — default: `6`

Maximum heading level to include, inclusive, from `1` to `6`. For example, `fromHeading: 2` with `toHeading: 3` includes only `##` and `###` headings.

### `className`

`string` — default: `"toc"`

CSS class for the generated wrapping `<div>`. Multiple classes can be separated by spaces, for example `"toc toc--compact"`. Only ASCII letters, digits, spaces, underscores, and hyphens are allowed; invalid values fall back to `"toc"`.

## Example

### Input

````md
# Headline 1.0.0

## Table of Contents

```toc
exclude: Table of Contents
from-heading: 2
to-heading: 6
```

## Headline 1.1.0

### Headline 1.1.1

## Headline 1.2.0
````

### Output

Equivalent Markdown after the TOC block is replaced (the HTML wrapper is omitted here for readability):

````md
# Headline 1.0.0

## Table of Contents

-   [Headline 1.1.0](#headline-110)

    -   [Headline 1.1.1](#headline-111)

-   [Headline 1.2.0](#headline-120)

## Headline 1.1.0

### Headline 1.1.1

## Headline 1.2.0
````

## License & Authors

[MIT][license] · Started by [signalwerk](https://github.com/signalwerk) supported by [several contributors](https://github.com/signalwerk/gatsby-remark-table-of-contents/graphs/contributors)

<!-- Definitions -->

[gatsby]: https://www.gatsbyjs.com/
[remark]: https://github.com/remarkjs/remark
[downloads]: https://www.npmjs.com/package/gatsby-remark-table-of-contents
[downloads-badge]: https://img.shields.io/npm/v/gatsby-remark-table-of-contents.svg
[license]: https://opensource.org/licenses/MIT
[author]: http://signalwerk.ch/

## Version

- **1.0.0** – FIX: Bugfix when JSX/MDX is used (author: [@zeropaper](https://github.com/zeropaper))
- **0.2.0** – ADD: Option to set ordered (author: [@thomasjungblut](https://github.com/thomasjungblut))
- **0.1.0** – ADD: Option to set Class-Name (author: [@panzerdp](https://github.com/panzerdp))
- **0.0.9** – ADD: Multiple excludes can now be defined by arrays (author: [@signalwerk](https://github.com/signalwerk))
- **0.0.1** – Initial release (author: [@signalwerk](https://github.com/signalwerk))
