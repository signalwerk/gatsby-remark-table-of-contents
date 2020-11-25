module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
