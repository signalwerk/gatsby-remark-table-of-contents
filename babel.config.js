module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: "ie >= 11",
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [["@babel/preset-env"]],
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
    },
  },
};
