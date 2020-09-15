import express from 'express';
import bodyParser from "body-parser";
const cors =  require('express-cors');
const app = express();
import { Account } from './Classes/Account'
import { MailInformer } from './Classes/MailInformer'
import { Transporter } from './Classes/Transporter'
let AccountDB =  require('./DataBase/AccountsCollection');


let account =  new Account('anyEmail', 'anyPassword', 'anyName');
let mailInformer = new MailInformer('anyPerson', 'Person', 'email which uses a classes','');
let transporter = new Transporter('gmail', account);

app.use( cors({
    allowedOrigins: [
        'github.com', 'google.com', 'localhost:3000'
    ]
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req,res) => {
    res.send('Hello')
});

app.post('/add-email', (req, res) =>{
    let { newEmail, newPassword, newPlatform } = req.body;
    
    AccountDB.addAccount({pass: newPassword, email:newEmail, name: newPlatform}, (err: any) => {
        err ? res.send('bląd') :  res.send("pomyślnie dodano konto");
    })
    
});

app.get('/list-email', (req, res) => {
    AccountDB.listAccount((err:any, account: any) => {
        err ? console.log('bląd') : console.log(account) ;
    })
})

app.get("/sending-email", (req, res) => {
    res.send(transporter.sendMessageByEmail(mailInformer));
})

app.listen(8000, () =>  console.log('serwer is running on localhost:8000'))

