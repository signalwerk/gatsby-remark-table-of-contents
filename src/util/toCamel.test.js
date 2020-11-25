/* globals test describe  expect */
import { strToCamel, keysToCamel } from "./toCamel";

describe("strToCamel function", () => {
  test("single camel case", () => {
    expect(strToCamel("in-string")).toBe("inString");
  });

  test("multiple camel case", () => {
    expect(strToCamel("multi-in-string")).toBe("multiInString");
  });
});

describe("keysToCamel function", () => {
  test("single camel case key", () => {
    expect(keysToCamel({ "in-key": 0 })).toEqual({ inKey: 0 });
  });

  test("multiple camel case key", () => {
    expect(keysToCamel({ "multi-in-key": 0 })).toEqual({ multiInKey: 0 });
  });
});
