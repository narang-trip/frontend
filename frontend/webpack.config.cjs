const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


module.exports = {
  mode: 'production', // 또는 'development'
  entry: './src/main.jsx', // 프로젝트의 진입점 파일을 main.jsx로 변경
  output: {
    filename: 'bundle.js', // 출력될 번들 파일 이름
    path: path.resolve(__dirname, 'dist'), // 번들 파일이 저장될 경로
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // 다른 이미지 최적화 옵션
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/, // JSX 파일을 처리하기 위한 설정 추가
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel 로더를 사용하여 JSX를 처리
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // React와 최신 JavaScript 지원
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // JavaScript 코드 최적화
      new CssMinimizerPlugin(), // CSS 코드 최적화
      new ImageMinimizerPlugin({ // 이미지 최적화
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['imagemin-mozjpeg', { progressive: true }],
              ['imagemin-pngquant', { quality: [0.6, 0.8] }],
              ['imagemin-svgo'],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html', // 웹팩이 index.html을 처리하도록 설정
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // .js와 .jsx 파일 모두를 해석할 수 있도록 설정
  },
};
