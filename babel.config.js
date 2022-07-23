module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          "root": ["./src"],
          alias: {
            assets: './assets',
            config: './config',
            component: './src/components',
            module: './src/modules',
            lib: './src/lib',
            types: './src/types',
            constants: './src/constants',
            stack: './src/stacks',
            screen: './src/screens',
          },
        },
      ],
    ],
  };
};
