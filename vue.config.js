const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
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
    }
})
