const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let controls1 = require('./JSONFILE/controls1.json');
let controls2 = require('./JSONFILE/controls2.json');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require('express-cors')
 
app.use(cors({
    allowedOrigins: [
        'github.com', 'google.com','localhost:3000'
    ]
}))

app.get("/react_app/controls1", (req, res) => {

    res.send(controls1);
    
});

app.get("/react_app/controls2", (req, res) => {

    res.send(controls2);
    
});


app.listen(8000,() =>
{ 
	console.log("Serwer was started under the  http://localhost:8000 adress");
});