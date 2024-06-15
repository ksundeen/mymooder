module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   [
    //     'babel-plugin-root-import',
    //     {
    //       rootPathPrefix: '@',
    //       rootPathSuffix: 'src'
    //     }
    //   ]
    // ],
    // env: {
    //   production: {
    //     plugins: [
    //       'babel-plugin-root-import',
    //       {
    //         rootPathPrefix: '@',
    //         rootPathSuffix: 'src'
    //       }
    //     ]
    //   },
    //   development: {
    //     plugins: [
    //       'babel-plugin-root-import',
    //       {
    //         { 
    //           rootPathPrefix: '@'
    //         },
    //         {
    //           rootPathSuffix: '/Users/Kim/Documents/repos/mymooder/mymooder-frontend/mymooder/leaflet.html'
    //         }
    //       }
    //     ]
    //   }
    // }
  }
};
