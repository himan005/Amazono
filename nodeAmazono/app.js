var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

const config = require('./config/config');

const app = express();


//var mongoose = require('./config/db');
mongoose.connect(config.database,err=>{
  if(err){
    console.log('Error in DB connection: '+JSON.stringify(err, undefined,2));
  }else{
      console.log('Connected to database successfull');
  }
});

// view engine setup



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
  origin:['http://localhost:4200'],
  credentials:true
}));


const userRouters = require('./routes/account');
const mainRouters = require('./routes/main');
const sellerRouters = require('./routes/seller');
const productSearchRouters = require('./routes/product-search');

app.use('/api', mainRouters); 
app.use('/api/accounts', userRouters);
app.use('/api/seller', sellerRouters)
app.use('/api/search', productSearchRouters);

app.listen(config.port,err=>{
  console.log("using port number" + config.port);
})


module.exports = app;
