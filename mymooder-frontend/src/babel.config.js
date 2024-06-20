process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';
module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
  }
};
