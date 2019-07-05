// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/proxy', {
      // target: 'http://promotion-service13-pre-zhyytest.oennso.enn.cn/api/v1/sop/',
      "target": 'http://172.16.40.42:8080/api/v1.0/userService',
      changeOrigin: true,
      pathRewrite: { '^/proxy': '' }
    }),
  );
  app.use(
    proxy('/api', {
      "target": "https://h5.ele.meint.dpool.sina.com.cn/iplookup",
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }),
  );
  app.use(
    proxy('/tb', {
      "target": "https://tcc.taobao.com",
      changeOrigin: true,
      pathRewrite: { '^/tb': '' }
    }),
  );
  // app.use(
  //   proxy('/api', {
  //     target: 'http://aaa:1000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   })
  // );
  // app.use(
  //   proxy('/xxx', {
  //     target: 'http://bbb:2000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/xxx': ''
  //     }
  //   })
  // );
};
