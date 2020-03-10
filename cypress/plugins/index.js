const fs = require('fs-extra');
const wp = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    },
  }
  on('file:preprocessor', wp(options))

  const file = config.env.configFile;
  const pathToConfigFile = 'cypress/config/' + `${file}` + '.json'
  return fs.readJson(pathToConfigFile);
}