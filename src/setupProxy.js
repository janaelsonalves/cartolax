const proxy = require("http-proxy-middleware");

const proxyConfig = {
  context: "/cartola",
  target: "https://api.cartolafc.globo.com",
  secure: false,
  pathRewrite: {
    "^/api": ""
  },
  changeOrigin: true
};

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://api.cartolafc.globo.com",
      secure: false,
      pathRewrite: {
        "^/api": ""
      },
      changeOrigin: true
    })
  );
};
