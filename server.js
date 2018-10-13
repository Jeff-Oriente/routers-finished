'use strict';


const express = require('express');



const logger = require('./middleware/logger');
const { PORT } = require('./config');

// Create an Express application
const app = express();

const notesrouter = require('./router/notes.router');

// Log all requests
app.use(logger);

// Create a static webserver
app.use(express.static('public'));

// Parse request body
app.use(express.json());


app.use('/api', notesrouter);
  /***** Never trust users - validate input *****/
  

// DEMO ONLY: brute-force way to test our error handler
app.get('/throw', (req, res, next) => {
  throw new Error('Boom!!');
});

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// NOTE: we'll prevent stacktrace leak in later exercise
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
// Listen for incoming connections
if (require.main === module) {    //did we run type in the Terminal node server command?  If we did....do stuff in this block of code.  
  app.listen(PORT, function () {  //so if we actually did run a server, we want to listen in on this port and do following stuff.   In the terminal, require.main equals whatever the module is.
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // Export for testing
