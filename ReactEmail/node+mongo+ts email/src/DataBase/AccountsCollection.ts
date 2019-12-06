const  mongoose: any = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/EmailCreator", { useNewUrlParser: true })

mongoose.connect('mongodb://localhost:27017/EmailCreator', { useUnifiedTopology: true,  useNewUrlParser: true },(error: Error) =>{
    if(error) console.log('blad');

        console.log("connection successful");
});

// mongoose.connection.on('open', () => {
//     console.log('Connected to mongo server.');
//     mongoose.connection.db.listCollections().toArray((err: Error, names: any) => {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         module.exports.Collection = names;
//     });
// })


let schemaAccount = new mongoose.Schema({
    email: String,
    pass: String,
    name: String,
},
{
    collection:"Account"
});

let Account = mongoose.model("Account", schemaAccount);

const addAccount = (newAccount: any, cb: Function) => {
    let account = new Account(newAccount);
    account.save((err: Error, account: Account ) =>  {
        !err ? cb(err) : cb(null, account);
    });
}

const  getAccount = (email: string, cb: Function) =>  {
    Account.find(email).exec((err: Error, account: Account) => {
        !err ? cb(err) : cb(null, account);
    });
}

const updateAccount = (accountData: any, updateOption: any , cb: Function) => {
    Account.findOneAndUpdate(accountData, updateOption).exec((err: Error, account: Account) => {
        !err ? cb(err) : cb(null, account);
    });
}

const deleteAccount = (accountData: any, cb: Function) => {

    Account.findOneAndRemove(accountData).exec((err:Error, account: Account) => {
        !err ? cb(err) : cb(null, account);
    });
}

const listAccount = (cb: Function) =>{
    console.log('wywołuje sie');
    Account.find({}).exec((err: Error, account: any) => {
        err ? cb(err) : cb(null, account);
    });
}

module.exports = {
    addAccount: addAccount,
    getAccount:getAccount,
    deleteAccount:deleteAccount,
    listAccount:listAccount,
    updateAccount:updateAccount
};