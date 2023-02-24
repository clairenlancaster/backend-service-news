const fs = require("fs/promises");

fetchAvailableEndpoints = () => {
  return fs
    .readFile(`${__dirname}/endpoints.json`, "utf-8")
    .then((endpointsJSON) => {
      console.log(endpointsJSON);
      const endpoints = JSON.parse(endpointsJSON);
      return endpoints;
    });
};

module.exports = { fetchAvailableEndpoints };
