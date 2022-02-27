const path = require('path');

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
      '@lib': path.resolve(__dirname, 'lib'),
      '@typing': path.resolve(__dirname, 'typing'),
      '@api': path.resolve(__dirname, 'pages/api'),
    };

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
    };
  },
};
