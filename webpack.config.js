const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const assetName = isDev ? '[name][ext]' : '[name].[hash][ext]';

console.log(`<--- ${isDev ? 'development' : 'production'} mode --->`);

// prettier-ignore
const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    static: path.resolve(__dirname, 'public'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};

module.exports = {
  entry: {
    app: './src/ts/index.ts',
  },

  output: {
    path: path.resolve(__dirname, 'app'),
    filename: `./js/${filename('js')}`,
    assetModuleFilename: `assets/${assetName}`,
    clean: true,
  },

  devtool: isDev ? 'inline-source-map' : false,

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `./css/${filename('css')}`,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'app', 'public'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/images/${assetName}`,
        },
      },

      {
        test: /\.(?:ico|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/icons/${assetName}`,
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/fonts/${assetName}`,
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  ...devServer(isDev),
};
