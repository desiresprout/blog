const path = require('path');
const { config } = require('process');

module.exports = {
  reactStrictMode: false,
  compress: true,
  webpack: (config, options) => {
    const prod = process.env.NODE_ENV === 'production';

    config.resolve.alias = {
      ...config.resolve.alias,
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@util': path.resolve(__dirname, 'util'),
    };

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
    };
  },
};
