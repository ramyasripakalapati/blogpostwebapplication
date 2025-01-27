const path = require('path');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".json"], // Add extensions for file resolution
    fallback: {
      path: require.resolve('path-browserify'),
      http: require.resolve('stream-http'),
      net: false,
      querystring: require.resolve('querystring'),
    },
  },
  // other Webpack configuration...
};
