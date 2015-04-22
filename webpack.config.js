var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {

  output: {
    library: process.env.ROOT_NAME || 'FamousAnimations',
    libraryTarget: 'umd'
  },

  externals: [
    // {
    //   "react": {
    //     root: "React",
    //     commonjs2: "react",
    //     commonjs: "react",
    //     amd: "react"
    //   },
    // },
    // {
    //   "lodash": {
    //     root: "_",
    //     commonjs2: "lodash",
    //     commonjs: "lodash",
    //     amd: "lodash"
    //   },
    // }
  ],

  module: {
    loaders: [
      // { test: /\.js$/, loader: 'babel?stage=0', exclude: /node_modules/ },
    ]
  },

  resolve: {
    root: [path.resolve("node_modules")],
    extensions: ['', '.js', '.jsx',]
  },

  node: {
    Buffer: false
  },

  plugins: plugins

};
