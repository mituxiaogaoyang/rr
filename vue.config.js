module.exports = {
    devServer: {
      proxy: {
        '/ct': {
          target: 'http://112.126.61.9:8090/', //'http://console.rr-tek.com/', // //10.10.254.243:7532  138 http://console.rr-tek.com/ct/index/query
          changeOrigin: true,
          ws: true,
          pathRewrite:{'^/ct' : ''}
        },
      },
      open: true,
    },
    lintOnSave: false,
}