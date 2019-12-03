
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Comunity", { useNewUrlParser: true })

// mongoose.connect(`mongodb://${DB_USER}
// :${DB_PASS}@ds161653.mlab.com:61653/12Comunity?authMechanism=MONGODB-CR`,{ useNewUrlParser: true });

var schemaNeon = new mongoose.Schema({
    imie: String,
    nazwisko: String,
    adres: String,
    email: String,
    stan: String,
    status: String,
    telefon: String,
    odpowiedzialny: Boolean,
    kantor: Boolean,
    MZimie: String,
    czlonek: Boolean,
    plec:String
},
{
    collection:"Neons"
});

var Neon = mongoose.model("Neon",schemaNeon);



function addNeon(neonData, cb) {

    var neon = new Neon(neonData);


    neon.save(function(err, neon) {

        if(err) {
            cb(err);
            console.log(err);
        } else {
            cb(null, neon);
        }

    });

}
function getNeon(nazwisko, cb) {

    Neon.find(nazwisko).exec(function(err, neon) {

        if(err) {
            cb(err);
        } else {
            cb(null, neon);
        }

    });

}


function updateNeon(neonData,UpdateOption, cb) {


    Neon.findOneAndUpdate(neonData, UpdateOption).exec(function(err, neon) {

        if(err) {
            cb(err);
        } else {
            cb(null, neon);
        }

    });

}

function deleteNeon(data, cb) {

    Neon.findOneAndRemove(data).exec(function(err, neon) {

        if(err) {
            cb(err);
        } else {
            cb(null, neon);
        }

    });

}
function listNeon(data,cb) {

    Neon.find(data).exec(function(err, neon) {

        if(err) {
            cb(err);
        } else {
            cb(null, neon);
        }

    });

}

function getNeonByEmail(email,cb){
    Neon.findOne({email:email}).exec(function(err, neon) {

        if(err) {
            cb(err);
        } else {
            cb(null, neon);
        }

    });
}


module.exports = {
    addNeon: addNeon,
    getNeon:getNeon,
    getNeonByEmail:getNeonByEmail,
    deleteNeon:deleteNeon,
    listNeon:listNeon,
    updateNeon:updateNeon
};

