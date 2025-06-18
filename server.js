const express = require('express');
const app = express();
/**import db.js */
const db = require('./db');


/** middleware import to convert any type of data into json */
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body


app.get('/', (req, res) => {
  res.send('Hello World')
})


/**import routes */
const personRoutes = require('./routes/personRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');

/**use the router */
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

app.listen(3000, () => {
  console.log('server is running')
})