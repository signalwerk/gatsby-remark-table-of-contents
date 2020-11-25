// convert "in-string" to "inString"
export const strToCamel = (str) => {
  return str.replace(/-(.)/g, (match, chr) => chr.toUpperCase());
};

// convert "{'in-key': val}" to "{'inKey': val}"
export const keysToCamel = (obj) => {
  if (obj) {
    const newObj = {};
    Object.keys(obj).forEach((k) => {
      newObj[strToCamel(k)] = obj[k];
    });
    return newObj;
  }
  return obj;
};
