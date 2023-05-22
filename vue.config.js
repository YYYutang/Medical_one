const { defineConfig } = require('@vue/cli-service')
const path = require('path')
var webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack:config=>{
    const dir= path.resolve(__dirname,'src/assets')
    config.module.rule('svg-sprite ')
    .test(/\.svg$/)
    .include.add(dir).end()
    .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
 config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')),[{plainSprite :true}]
  config.module.rule('svg').exclude.add(dir)
},
    devServer: {
     // 代理配置
      proxy: {

          '/api': {
          target: 'http://10.16.72.33:8080', // 我们要代理的地址
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
