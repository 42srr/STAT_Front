const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/naver', {
      target: 'https://m.search.naver.com',
      pathRewrite: {
        '^/naver':''
      },
      changeOrigin: true
    })
  )

  app.use(
    createProxyMiddleware('/118.67.134.143', {
      target: 'https://다른호스트',
      pathRewrite: {
        '^/지우려는패스':''
      },
      changeOrigin: true
    })
  )}
