require('dotenv/config');
require('./bin/helpers/mongodb/connection');
const AppServer = require('./bin/app/server');
const appServer = new AppServer();
const port = process.env.PORT || 5000;

appServer.server.listen(port, () => {
  console.log(`${appServer.server.name} started, listening at ${appServer.server.url}`, 'intiatiate application');
});