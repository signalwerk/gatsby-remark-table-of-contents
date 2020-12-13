# Table of Contents in Gatsby

[![Downloads][downloads-badge]][downloads] ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)


[Gatsby][gatsby] plugin using [remark][remark] to generate a Table of Contents in markdown.

## Installation

### Requirements

This plugin requires [gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/) to generate the anchor links.

```sh
npm i --save gatsby-remark-autolink-headers
```

### Install gatsby-remark-table-of-contents

```sh
npm i --save gatsby-remark-table-of-contents
```

### Global Configuration
Global configurations should be set in `gatsby-config.js`.

```js
module.exports = ({ root }) => ({
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
              className: "table-of-contents"
            },
          },
          `gatsby-remark-autolink-headers`
        ],
      },
    },
  ],
})
```

## Use
Generate a table of contents:

````md
```toc
# This code block gets replaced with the TOC
```
````

If you like to overwrite the global settings in place (camelCase or kebab-case):

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
### `exclude`

`string? | array?` — default: `''`  
Exclude titles matching this string (`new RegExp('^(' + string + ')$', 'i')`).
If an array is passed the array gets joined with a pipe (`new RegExp('^(' + array.join('|') + ')$', 'i')`).

### `tight`

`boolean?` — default: `false`  
Tight list items.

### `ordered`

`boolean?` — default: `false`  
Creates an ordered list.

### `fromHeading`

`number?` — default: `2`  
Minimum heading depth to include.


### `toHeading`

`number?` — default: `6`  
Maximum heading depth to include.

### `className`

`string?` — default: `toc`  
Set the `class`-name of the generated div.

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


[gatsby]: https://www.gatsbyjs.org/
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
