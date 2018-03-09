// Config
const isDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g;
// Clear value
const clear = (string) => {
  if (!string) return string;
  return string.replace(/-/g, '');
};
const uniqueParam = (param) => {
  // Response
  const response = {
    host: param,
    port: 80,
  };
  // Parser unique param
  if (param.indexOf(':') > -1) {
    // Split string
    const split = param.split(':');
    // Extract param
    const host = split[0];
    const port = split[1];
    // Push
    response.host = host;
    response.port = port;
  }
  // Return
  return response;
};
// Parser params
const parserParams = (obj) => {
  // Response
  let response = {};
  // Loop
  for (let i = 0; i <= obj.length; i += 1) {
    // Value
    const val = obj[i];
    const next = obj[i + 1];
    // Comprobe
    if (i % 2 === 0 || (val && val.indexOf('-') > -1)) {
      // Parser params
      const key = clear(val);
      const value = next || true;
      // Set params
      // If is domain
      if (value.toString().indexOf('-') > -1) {
        // Reverse
        const isdomain = key.match(isDomain);
        if (isdomain) {
          const param = uniqueParam(key);
          response = Object.assign(param, response);
        }
      } else {
        // Push
        response[key] = value;
        // Sum
        i += 1;
      }
    }
  }
  // Return
  return response;
};
const getParams = (obj) => {
  // Comprobe
  if (!Array.isArray) {
    console.error('Params is a not array');
    process.exit();
  }
  // Response
  const response = obj.length === 1 && obj[0].indexOf('-') === -1 ? uniqueParam(obj[0]) : parserParams(obj);
  // Return
  return response;
};

module.exports = getParams;
