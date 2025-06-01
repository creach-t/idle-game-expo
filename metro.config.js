const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle the TurboModule registry
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;