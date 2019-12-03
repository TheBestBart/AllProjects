

const mongoose = require("mongoose");

const DB_USER = "bartek"
const DB_PASS = "lebek";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds259268.mlab.com:59268/sklepprzemyslowy`,{ useNewUrlParser: true });


var schemaProduct = new mongoose.Schema({
    name: String,
    kategoria: String,
    firma: String,
    cena: Number,
    ilosc: Number,
    zdjecie: String 
},
 {
    collection: "Products"
  });

var Product = mongoose.model("Product", schemaProduct);



function addProduct(productData, cb) {

    var pierwsza = productData.name[0];
    pierwsza = pierwsza.toUpperCase();
    productData.name = productData.name.toLowerCase();
    productData.name[0] = pierwsza;
    

    var product = new Product(productData);

    product.save(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });

}

function getProduct(prod, cb) {

    Product.findOne({name:prod.name}).exec(function(err, product) {
        if(err) {
            cb(err);
            
        } else {
            cb(null, product );
        }

    });

}

function updateProduct(found,productData, cb) {


    Product.findOneAndUpdate(found, productData).exec(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });

}

function deleteProduct(name, cb) {

    Product.findOneAndRemove({name:name}).exec(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });
}

function listProducts(kategoria,cb) {


    if(kategoria===null)
    {
      Product.find({},{_id : 0}).exec(function(err, products) {

        if(err) {
            cb(err);
        } else {
            cb(null, products);
        }

    });  
    }else{
        Product.find({kategoria:kategoria},{_id : 0}).exec(function(err, products) {

            if(err) {
                cb(err);
            } else {
                cb(null, products);
            }

        });
    }

}

function getProductByName(name,cb){


    const sReg= new RegExp(''+name+'',"i");

    Product.find({name: sReg }).exec(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });


}

function getProductByMoreInfo(productData,cb){
    Product.find({firma:productData.firma, cena:productData.cena }).exec(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });
}

function getProductByName2(name,cb){


    const sReg= new RegExp('^'+name+'',"i");

    Product.find({zdjecie: name }).exec(function(err, product) {

        if(err) {
            cb(err);
        } else {
            cb(null, product);
        }

    });


}

function getProduct2(prod, cb) {

    Product.find(prod).exec(function(err, product) {
        if(err) {
            cb(err);
            
        } else {
            cb(null, product );
        }

    });

}



module.exports = {
    add: addProduct,
    get: getProduct,
    get2:getProduct2,
    update: updateProduct,
    delete: deleteProduct,
    list: listProducts,
    getProductByName: getProductByName,
    getProductByName2:getProductByName2
   
};

