const express = require('express')
const app = express();
const morgan = require('morgan')
const bodyParser =require('body-parser')
const mongoose = require('mongoose')

const UserRoutes =require('./api/User')



const DB ='mongodb+srv://BE_API:Customer_information@cluster0.ovvud.mongodb.net/BE_API?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('Connection Successful');
}).catch((error)=> console.log('No Connection'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user',UserRoutes)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

module.exports=app;