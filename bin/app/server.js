const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const productController = require('../modules/product/controller');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  //route
  this.server.get('/', (req, res) => {
    res.send('This server work properly');
  });

  this.server.get('/product/v1/:productId', productController.getProduct);
  this.server.get('/product/v1', productController.listProduct);
  this.server.post('/product/v1', productController.createProduct);
  this.server.put('/product/v1/:productId', productController.updateProduct);
  this.server.del('/product/v1/:productId', productController.deleteProduct);

}

module.exports = AppServer;