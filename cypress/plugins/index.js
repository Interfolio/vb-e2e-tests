const fs = require('fs-extra');

module.exports = (on, config) => {
  const file = config.env.configFile;
  const pathToConfigFile = 'cypress/config/' + `${file}` + '.json'
  return fs.readJson(pathToConfigFile);
};
