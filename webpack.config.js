const path = require('path');

module.exports = {
  mode: 'development', // ou 'production' ou 'none'
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'myLibrary',
      type: 'umd',
    },
    globalObject: 'this',
  },
};
