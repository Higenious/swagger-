var mongoose       = require('mongoose');
var express        =  require('express');
var bodyParser     =  require('body-parser');
var app            =  express();
var path           = require('path');
var port           =  5000;
var productModel   =  require('./model/product').product;
var router        =  express.Router();
const cors = require('cors');
var productRoutes    =  require('./routes/product');
var swaggerJSDoc = require('swagger-jsdoc');
app.use(express.static(path.join(__dirname, 'dist')));

//connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/Swagger',{ useNewUrlParser: true });
console.log('connected to database');
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({  extended: true }));



// swagger definition
var swaggerDefinition = {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  // options for the swagger docs 
  var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./**/routes/*.js','product.js'],// pass all in array 
    };
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);


//Middleware for CORS
app.use(cors());

// app.get('/', function(req, res){
//     console.log('Running on server');
//     res.send('index');
// })


// serve swagger 
app.get('/', function(req, res){
   
   res.sendfile('index');
 });


// Routess/
app.all('*', productRoutes);

//start  application on port
app.listen(port, function ()  {
    console.log(`Server Successfully started on port ${port}`);
});