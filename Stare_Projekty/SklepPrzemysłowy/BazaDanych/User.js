// const mongoose = require("mongoose");
const DB_USER = "bartek"
const DB_PASS = "lebek";


const mongoose = require("mongoose");
mongoose.connect(`mongodb://${DB_USER}
:${DB_PASS}@ds259268.mlab.com:59268/sklepprzemyslowy`,{ useNewUrlParser: true });

var schemaUser = new mongoose.Schema({
    imie:String,
    nazwisko:String,
    email:String,
    haslo:String,
    admin:Boolean,
},
{
    collection:"Users"
});

var User = mongoose.model("User",schemaUser);


function addUser(userData, cb) {

    userData.admin =  false;
    console.log(userData);
    var user = new User(userData);

    user.save(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });

}

function getUser(id, cb) {

    User.findById(id).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });

}


function updateUser(userData,UpdateOption, cb) {

    var id = userData._id;


    delete userData.id;

    User.findByIdAndUpdate(id, UpdateOption).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });

}

function deleteUser(id, cb) {

    User.findByIdAndRemove(id).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });

}
function listUsers(anyData,cb) {

    User.find(anyData).exec(function(err, users) {

        if(err) {
            cb(err);
        } else {
            cb(null, users);
        }

    });

}

function getUserByEmail(email,cb){
    User.findOne({email:email}).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });
}

function getLogin(DataBase,cb){
    User.find({email:DataBase.email , haslo:DataBase.password}).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });
}

function getActiveUsers(active,cb){
    User.find({zalogowany:true}).exec(function(err, user) {

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }

    });
}


module.exports = {
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    listUsers: listUsers,
    getUserByEmail: getUserByEmail,
    getLogin: getLogin
   
};