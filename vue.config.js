const { defineConfig } = require('@vue/cli-service')
const path = require('path')
var webpack = require('webpack')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack:config=>{

    config.module.rule('svg').exclude.add(path.join(__dirname, 'src/assets')).end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname,'src/assets'))
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId:'icon-[name]'
      })
      .end()
  },
    devServer: {
     // 代理配置
      proxy: {

          '/api': {
          target: 'http://10.16.14.203:8088', // 我们要代理的地址
    // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
          pathRewrite: {
              '^/api': ''  
          }
        },
      }
    },
    configureWebpack: {
      plugins: [
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
          })
      ]
  }
})
