var express = require('express');
var app = express();
var path = require('path');
//read pythonscript
let {PythonShell} = require('python-shell');
var myPythonScriptPath = './wisebatt/WB_SCRIPT.py';
//read csv
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
//email subscription
require('./email');

// This responds a GET request on email subscription.
app.get('/email', function (req, res) {
  console.log("Got a GET request for email subscription");
  res.sendFile(path.join(__dirname + '/routes/email.html'));
})

// This responds a GET request for profile page
app.get('/profile', function(req, res) {   
  console.log("GET request for profile page");
  res.sendFile(path.join(__dirname + '/routes/profile.html'));
})

// This responds a GET request for pyscript page
app.get('/pyscript', function(req, res) {   
  console.log("GET request for pyscript page");
  //5pythonshell to read pyscript file
    pyshell = new PythonShell(myPythonScriptPath);
    function processUserInput(callback) {
    pyshell.on('message', function (message) {
     // pyScript = message;
      console.log("hello");
      callback(message);
      })
    }
  // end the input stream and allow the process to exit
  function greeting(message) {
    console.log('Hello ' + message);
    res.sendFile(path.join(__dirname + '/routes/python.html'));
    res.json(message); //write a response to the client
    res.end(); //end the response
  }
  processUserInput(greeting);
      pyshell.end(function (err) {
      if (err){
         // throw err;
         console.log(err);
      };
      console.log('finished');   
    });
  });

// This responds a GET request for csv page
app.get('/csv', function(req, res) {   
  console.log("GET request for csv page");
 
  //fs.createReadStream('./wisebatt/WB_MOCK_DATA.csv')
  readFile('./wisebatt/WB_MOCK_DATA.csv', 'utf-8', (err, fileContent) => {
    if(err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
    }
    const jsonObj = csvjson.toObject(fileContent);
    //console.log(jsonObj);
    res.sendFile(path.join(__dirname + '/routes/csv.html'));
    res.json(jsonObj); //write a response to the client
    res.end(); //end the response    
});
})

// This responds a GET request for Login page
app.get('/login', function(req, res) {   
  console.log("GET request for login page");
  res.sendFile(path.join(__dirname + '/routes/login.html'));
})

// This responds a GET request for signup
app.get('/signup', function(req, res) {   
  console.log("GET request for signup page");
  res.sendFile(path.join(__dirname + '/routes/signup.html'));
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port);
})
//public folders
app.use('/common', express.static(path.join(__dirname, 'common')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
//app.use('/auth', express.static(path.join(__dirname, 'auth')));