// convert "in-string" to "inString"
const strToCamel = (str) => {
  return str.replace(/-(.)/g, (match, chr) => chr.toUpperCase());
};

// convert "{'in-key': val}" to "{'inKey': val}"
const keysToCamel = (obj) => {
  if (obj) {
    const newObj = {};
    Object.keys(obj).forEach((k) => {
      newObj[strToCamel(k)] = obj[k];
    });
    return newObj;
  }
  return obj;
};

module.exports = { strToCamel, keysToCamel };
