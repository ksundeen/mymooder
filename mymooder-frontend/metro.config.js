// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
    // Adds support for `.db` files for SQLite databases
    'db'
  );


// const ALIASES = {
//     'react-native': 'react-native-web',
//     'react-native-webview': 'react-native-web-webview'
// };
// config.resolver.resolveRequest = (context, moduleName, platform) => {
// if (platform === 'web') {
//     // The alias will only be used when bundling for the web.
//     return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
// }
// // Ensure you call the default resolver.
// return context.resolveRequest(context, moduleName, platform);
// };

module.exports = config;
