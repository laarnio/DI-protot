const withSass = require('@zeit/next-sass');
require('dotenv').config()
const webpack = require('webpack')
module.exports = withSass({
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
})