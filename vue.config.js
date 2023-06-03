/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 15:55:48
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-03 22:03:56
 * @FilePath: /CLUBoat_Frontend/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://1.15.156.161:8099/',
        changeOrigin: true,             //是否跨域 （虚拟的站点需要更换origin）
        ws: true,                       //是否代理 websockets
        secure: true,                   //是否https接口
        pathRewrite: {
          '^/api': ''
        }
      },
      '/localhost': {
        target: 'http://localhost:8099/',
        changeOrigin: true,             //是否跨域 （虚拟的站点需要更换origin）
        ws: true,                       //是否代理 websockets
        secure: true,                   //是否https接口
        pathRewrite: {
          '^/localhost': ''
        }
      },
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
