// all the setup of application is done here

const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// to check time taken to connect with Mongo server
const started = new Date();
console.info(`Connecting to Mongoose: ${started.toLocaleTimeString()}`);

const tm = function(startTime, failVal) {
  var end = new Date() - startTime;
  var fail = end <= failVal ? 'pass' : 'fail';
  return `${new Date().toLocaleTimeString()}: ${end
    .toString()
    .padStart(5, ' ')} ms : ${fail}`;
};

mongoose // this connect returns a promise
  .connect(DB, {
    // just deal with deprication warnings
    useUnifiedTopology: true,
    useNewUrlParser: true
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(con => console.log('DB connection successful!', tm(started, 20000)));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!! Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
