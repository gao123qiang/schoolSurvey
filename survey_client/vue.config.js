
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const { title } = require("./src/config/settings")

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'config': '@/config',
        'plugins': '@/plugins',
        'styles': '@/styles',
        'utils': '@/utils',
        'router': '@/router',
        'store': '@/store',
      }
    }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  lintOnSave: false
};