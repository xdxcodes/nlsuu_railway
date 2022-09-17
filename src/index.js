const express = require('express');
const app = express();
const confessions = require('./routes/confessions')
const port = process.env.PORT || 3000;
const path = require('path')

require('./db/mongoose')

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
//     next();
//   });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.use(express.json())


app.use(confessions)



app.use(express.static(path.join(__dirname,'../client/build')))

app.get('*',(req,res)=>{

  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

console.log(path.resolve(__dirname,'../client/build/index.html'))


app.listen(port, ()=>{
    console.log('listening on port' + port);
})