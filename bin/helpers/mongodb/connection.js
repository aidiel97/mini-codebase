const mongoose = require('mongoose');
require('dotenv/config');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DATABASE_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.log('error', error);
    process.exit();
  });