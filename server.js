// https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb
// https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
// ****************************MODULES*****************************
var express = require('./node_modules/express')
var path = require('path')
var app = express()
var routes = require('./routes')


app.use('/', routes)

app.listen(8085, function () {
  console.log('RELEASE listening test on port 8085')
})
