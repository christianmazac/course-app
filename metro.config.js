const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Keep the app's existing polyfill while letting Metro resolve workspace packages.
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  punycode: require.resolve('punycode'),
};

module.exports = config;