const http = require("http");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");
var app = express();


app.use(express.static(__dirname+"/public/"));

app.use((req,res,next)=>{
    var now = Date().toString();
    var log = "Now: "+ now +"; Method: "+req.method+"; Url: "+req.url
      console.log(log);
  fs.appendFile("LogInPages.log",log+"\n",function(err){if(err){ console.log("Error to AppendFile") }});
    next();
});


hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

  hbs.registerHelper('toUpper',function(text){
    return text.toUpperCase();
  });

  app.set('view enginer','hbs');



              // app.use((req,res,next)=>{
              //   next();
              //
              //   // TODO   =>            render didn't work
              //
              //       res.render('maintenance.hbs');
              // });





// http.createServer((request,response)=>{
//   response.end("<h1>Hi Mr_Sdk</h1>");
// }).listen(8080);


  app.get('/',(request,response)=>{
    // response.send("<h1 style='margin-left: 200px'>Hi Mr_Sdk</h1>");
    // response.send({
    // name: "Mr_Sdk",
    // his_applications: [
    //   'Firewall',
    //   'Imo',
    //   'Istagram'
    // ],
    // DirName : __dirname

    // });

    response.render('home.hbs',{
      titlePage : "Home Page",
      welcomeMessage : "Welcome to my Home Page",
      // currentYear : new Date().getFullYear()
    });
  });
  app.get('/about',(request,response)=>{
    // response.send("This page of About");
    response.render('about.hbs',{
        titlePage : "About Page",
        // currentYear : new Date().getFullYear()
    });
  });

  app.get('/bad',function(req,res){
    res.send({
      errorMessage : "Unable to handl request"
    });
  });


app.listen(8080,()=>{

  console.log("Server is up on port 8080");
});
