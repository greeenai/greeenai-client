const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      const defaultResolveResult = context.resolveRequest(
        context,
        moduleName,
        platform,
      );

      if (
        process.env.STORYBOOK_ENABLED !== 'true' &&
        defaultResolveResult?.filePath?.includes?.('.ondevice/')
      ) {
        return {type: 'empty'};
      }

      return defaultResolveResult;
    },
    extraNodeModules: {
      '@babel/runtime': path.resolve(
        __dirname,
        'node_modules',
        '@babel/runtime',
      ),
      'react-native': __dirname + '/node_modules/react-native',
    },
    unstable_enableSymlinks: true,
    unstable_enablePackageExports: true,
    assetExts: getDefaultConfig().resolver.assetExts.filter(
      ext => ext !== 'svg',
    ),
    sourceExts: [...getDefaultConfig().resolver.sourceExts, 'svg'],
  },
  watchFolders: [path.join(__dirname, '..', '..')],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

// Merge the final configuration
const finalConfig = mergeConfig(defaultConfig, config);

// Apply Storybook settings only if enabled
module.exports = withStorybook(finalConfig, {
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  configPath: path.resolve(__dirname, './.ondevice'),
});
