const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
  app.use(
     createProxyMiddleware("/orders/new",
        {
          target      : "http://localhost:8086",
          changeOrigin: true,
        }),
  )
     app.use(
        createProxyMiddleware("/orders/fin",
           {
             target      : "http://localhost:8086",
             changeOrigin: true,
           }),
     );
};