const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/client.html");

});


app.post("/", function (req, res) {

    const cityName = (req.body.city);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b3347e06c3f5e26c2c8d0a2f71cb02a4&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const jasonData = JSON.parse(data)
            const weatherDes = jasonData.weather[0].description;
            const temp = jasonData.main.temp;
            const max_temp = jasonData.main.temp_max;
            const min_temp = jasonData.main.temp_min;
            const hum = jasonData.main.humidity;
            const w_speed = jasonData.wind.speed;
            res.write("<p>The current weather in " + cityName + " is " + weatherDes + "<p>");
            res.write("<p>The temperature in  " + cityName + " is " + temp + "<p>");
            res.write("<p>The Todays's maximum temperature in " + cityName + " is " + max_temp + "<p>");
            res.write("<p>The humidity in " + cityName + " is " + hum + "<p>");
            res.write("<p>The windspeed in " + cityName + " is " + w_speed + "<p>");
            res.send()
            // res.send(jasonData);

        });

    });
})



app.listen(3000, function () {
    console.log("server is listning at port #3000");
});



// weather Api
// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=b3347e06c3f5e26c2c8d0a2f71cb02a4&units=metric
