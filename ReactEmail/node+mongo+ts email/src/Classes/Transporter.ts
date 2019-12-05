const nodemailer = require('nodemailer');
import  { Account } from './Account';
import  { MailInformer } from './MailInformer';

export class Transporter { 

    private _service: string;
    private _auth: {user: string, pass: string};

    public constructor(service: string, account?: Account ) {
        this._service = service;
        account 
            ? this._auth = {user: account.getEmail(), pass: account.getPassword() } 
            : this._auth = {user: '', pass: ''};
    }
    
    private _getTransporterObject = (): {} => {
        return {
            service: this._service,
            auth: {
                user: this._auth.user,
                pass: this._auth.pass
            },
            tls: {
                rejectUnauthorized: false
            } 
        }
    }

    private _createTransport = (): any  => {
       return nodemailer.createTransport(this._getTransporterObject());
    }

    public setService = (service: string): void => {
        this._service = service;
    }

    public setAuth = (account: Account): void => {
        this._auth = {user: account.getEmail(), pass: account.getPassword() };
    }

    public setAuthByStrings = (user: string, pass: string): void => {
        this._auth.pass = pass;
        this._auth.user = user;
    }

    public sendMessageByEmail = (mailInformer: MailInformer) => {
        mailInformer.setFrom('Bartek');
        this._createTransport().sendMail(mailInformer.getInfoObject(), (error: any, info: any) => {
            error ? console.log(error) : console.log(`Email sent: ${info.response}`);
        }); 
    }
}
