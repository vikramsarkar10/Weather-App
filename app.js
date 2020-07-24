const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const city = req.body.cityName;
  // console.log(req.body.cityName);
  const apiKey = "e3dad78884e024d437bf628ee9cc6862";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+apiKey+"&units=metric";
  https.get(url,function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<h1>The temperature at "+ city +" is "+ temp +" degree celcius</h1>");
      res.write("<h2>The weather is currently: "+ desc +"</h2>");
      res.write("<img src="+ imgurl +">");
      res.send();
    });
  });
});

app.listen(3000, function(){
  console.log("server started at port 3000");
})
