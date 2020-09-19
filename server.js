/**
* Will Gillette
* Running Log Server Side
* Started on 9/18/20
* Handles requests to the server
*/

// ** Modules *
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

// ** Variables *
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle the request to get the entries from the JSON file
app.get("/getEntries", (req, res) => {  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  fs.readFile("./entries.json", "utf-8", function (err, data) {
    res.send(data);
    res.end(data);
  });
});

// Handles the request to post new entries to the JSON file
app.post("/postEntries", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.Title && req.Description && req.Distance){
    fs.readFile("./entries.json", "utf-8", function (err, data) {
      data[data.length] = {Title: req.Title, Description: req.Description, Distance: req.Distance};
      
      fs.writeFile('./entries.json', JSON.stringify(data, null, 2), 'utf8', function (err) {
        if (err)   
          console.log(err);
        else {
          res.status(200);
          res.send(JSON.stringify({
            Success: true,
            Message: "Successfully appended the entry!"
          }));
        }
      });
    });
  }
});

// Listens for requests
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});