const mongoose = require("mongoose");

const DB_USER = "bartek"
const DB_PASS = "lebek";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds259268.mlab.com:59268/sklepprzemyslowy?authMechanism=SCRAM-SHA-1'`, { useNewUrlParser: true });

// mongoose.connect('mongodb://${user}:${pass}@${uri}/${db}?authMechanism=SCRAM-SHA-1')


var schemaBin = new mongoose.Schema({ 
    klient: String,
    koszyk:[{nazwa:String,firma:String,ilosc:Number}],
    suma:Number
},
{
   collection: "Bins"
});

var Bin = mongoose.model("Bin", schemaBin);

function addBin(data, cb) {


    var bin = new Bin(data);

    bin.save(function(err, bin) {

        if(err) {
            cb(err);

        } else {
            cb(null, bin);
        }

    });

}


function getBin(binEmail, cb) {

    Bin.find(binEmail).exec(function(err, bin) {

        if(err) {
            cb(err);
        } else {
            cb(null, bin );
        }

    });

}

function updateBin(binData,UpdateOption,cb) {

    Order.findOne(binData, UpdateOption).exec(function(err, bin) {
      console.log("to jest to" + bin);
        if(err) {
            cb(err);
        } else {
            cb(null, bin);
        }

    });

}

function deleteBin(email, cb) {

    Order.findOne(email).exec(function(err, bin) {

        if(err) {
            cb(err);
        } else {
            cb(null, bin);
        }

    });

}

function listBins(binData,cb) {
if(binData===null)    
      {Bin.find({}).exec(function(err, bins) {

          if(err) {
              cb(err);
          } else {
              cb(null, bins);
          }

      });
    }
    else{
       {Bin.find(binData).exec(function(err, bins) {

          if(err) {
              cb(err);
          } else {
              cb(null, bins);
          }

       });
      }
  }
}
function DeleteBinById(id,cb){

  Bin.findOneAndRemove({_id:id}).exec(function(err, bin) {

        if(err) {
            cb(err);
        } else {
            cb(null, bin);
        }

    });
}
function DeleteAllBins(email,cb){
  Bin.deleteMany({email:email}, function (err) {});
}





module.exports = {
    addBin: addBin,
    getBin: getBin,
    updateBin: updateBin,
    deleteBin: deleteBin,
    listBins: listBins,
    DeleteBinById:DeleteBinById,
    DeleteAllBins:DeleteAllBins

};