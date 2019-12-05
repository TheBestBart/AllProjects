const express = require('express');
const app = express();
const bodyParser = require("body-parser");
let controls1 = require('./JSONFILE/controls1.json');
let controls2 = require('./JSONFILE/controls2.json');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let cors = require('express-cors')

var nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport("SMTP",{
//     port: 8000,
//     host: 'localhost',
//     tls: {
//       rejectUnauthorized: false
//     },
//   });

var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 8000,
    secure: false, // use SSL
    auth: {
        user: 'lebekbartlomiej@gmail.com',
        pass: 'Bartek1a3ctet'
    }
};

var smtpConfig = {
    service: 'gmail.com',
    secure: false,
    port:8000,
    auth: {
        user: 'lebekbartlomiej@gmail.com',
        pass: 'Bartek1a3ctet'
    },
    tls: {
        rejectUnauthorized: false
    }
};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lebekbartlomiej@gmail.com',
        pass: 'Bartek1a3ctet'
    },
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'Bartek Łebek',
  to: 'lebekbartlomiej@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'ja piernicze dziala'
};


const sendEmail = () => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}

 
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

app.get("/sending-email", (req, res) => {
    res.send(sendEmail());
})


app.listen(8000,() =>
{ 
	console.log("Serwer was started under the  http://localhost:8000 adress");
});