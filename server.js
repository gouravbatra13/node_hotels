const express = require('express');
const app = express();
require('dotenv').config();

/**import db.js */
const db = require('./db');




/** middleware import to convert any type of data into json */
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body




/**middleware create for log request */
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
}
/**apply middleware in all routes */
app.use(logRequest);





/** import passport.js auth */
const { passport, localStrategyMiddleware } = require('./auth.js');
// Init middleware
app.use(passport.initialize());


app.get('/',localStrategyMiddleware,(req, res) => {
  res.send('Hello World')
})




/**import routes */
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

/**use the router */
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.listen(3000, () => {
  console.log('server is running')
})