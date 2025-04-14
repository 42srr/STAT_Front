import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { Application } from "express";

module.exports = function (app: Application) {
  app.use(
    "/naver",
    createProxyMiddleware({
      target: "https://m.search.naver.com",
      pathRewrite: {
        "^/naver": "",
      },
      changeOrigin: true,
    })
  );

  app.use(
    "/118.67.134.143",
    createProxyMiddleware({
      target: "https://다른호스트",
      pathRewrite: {
        "^/지우려는패스": "",
      },
      changeOrigin: true,
    })
  );
};
