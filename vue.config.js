const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  devServer:{
    open:true,
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn",
        changerOrigin:true //允许跨域代理

      }
    }
  },
  lintOnSave: false
})
