const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  stream: require.resolve('readable-stream'), // Map 'stream' to 'readable-stream'
  crypto: require.resolve('expo-crypto')
};

module.exports = defaultConfig;
