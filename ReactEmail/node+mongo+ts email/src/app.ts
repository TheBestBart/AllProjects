import express from 'express';
import bodyParser from "body-parser";
const cors =  require('express-cors');
const app = express();
import { Account } from './Classes/Account'
import { MailInformer } from './Classes/MailInformer'
import { Transporter } from './Classes/Transporter'
let AccountDB =  require('./DataBase/AccountsCollection');


let account =  new Account('lebekbartlomiej@gmail.com', 'Bartek1a3ctet', 'Bartek Lebek');
let mailInformer = new MailInformer('Jakub Lebek', 'marglazowska@gmail.com', 'email which uses a classes','ja piernicze dziala');
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

app.get('/add-email', (req, res) =>{
    AccountDB.addAccount({name: 'bartek',pass: '2tetBartson', email:"lebek12345.95@o2.pl"}, (err: any) => {
        err ? console.log('bląd') : console.log('pomyslnie dodano produkt')
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

