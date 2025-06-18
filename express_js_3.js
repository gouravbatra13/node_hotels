const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/gourav', (req, res) => {
  res.send('Hello Gourav')
})


app.get('/idli', (req, res) => {
  var custom_idli = {
    name : "Ye idli",
    is_smabhar : true,
    size:"10cm"
  }
  res.send(custom_idli)
})


app.listen(3000,()=>{
  console.log('server is running')
})