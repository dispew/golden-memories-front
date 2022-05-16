module.exports = {
    devServer: {
      port: 3000,
      proxy: 'http://127.0.0.1:5000/api',
    }
  }