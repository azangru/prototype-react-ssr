import { createProxyMiddleware } from 'http-proxy-middleware';

export const starWarsGraphqlProxy = createProxyMiddleware({
  target: 'https://swapi-graphql.netlify.app',
  pathRewrite: {
    '^/starwars-graphql': '/.netlify/functions/index'
  },
  changeOrigin: true,
  logLevel: 'debug',
  secure: false
});
