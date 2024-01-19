const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
  app.use(
     createProxyMiddleware("/orders/new",
        {
          target      : "http://94.198.221.250:8086",
          changeOrigin: true,
        }),
  )
     app.use(
        createProxyMiddleware("/orders/fin",
           {
             target      : "http://94.198.221.250:8086",
             changeOrigin: true,
           }),
     );
};