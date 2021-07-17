const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProgressPlugin } = require('webpack')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/i, // .js / .mjs
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // use babel for compatibility
          options: {
            presets: [
              ['@babel/preset-env', { // https://babeljs.io/docs/en/babel-preset-env
                useBuiltIns: 'usage', // import used polyfills in core-js automatically
                corejs: '3',
                targets: {
                  chrome: '41',
                  ie: '9' // and Promise polyfill will be introduced
                }
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/i, // allows you to import css
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      scriptLoading: 'blocking'
    }),
    new ProgressPlugin()
  ]
}