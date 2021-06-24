module.exports = {
    devServer: {
      proxy: {
        '/apiPath': {
          target: 'http://112.126.61.9:8090/',//10.10.254.243:7532  138
          changeOrigin: true,
          ws: true,
          pathRewrite:{'^/apiPath' : ''}
        },
      },
      open: true,
    },
    lintOnSave: false,
}