

const DB_USER = "bartek"
const DB_PASS = "lebek";


const mongoose = require("mongoose");
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@ds259268.mlab.com:59268/sklepprzemyslowy`,{ useNewUrlParser: true });


var schemaOrder = new mongoose.Schema({
    IdKlient: String,
    zamowienie: [{ nazwa: String, firma:String, ilosc: Number, cena:Number }],
    suma: Number,
    data:String,
    zaplacone: Boolean,
    otrzymano:Boolean,
    realizacja: Boolean
},
 {
    collection: "Orders"
  });

var Order = mongoose.model("Order", schemaOrder);

function addOrder(orderData, cb) {    
    var order = new Order(orderData);

   
    console.log(orderData);
    order.save(function(err, ord) {
        console.log(order);

        if(err) {
            cb(err);
        } else {
            cb(null, ord);
            console.log(ord);
        }

    });

}

function getOrder(id, cb) {

    Order.findOne({_id:id}).exec(function(err, order) {

        if(err) {
            cb(err);
        } else {
            cb(null, order );
        }

    });

}

function updateOrder(orderData,UpdateOption,cb) {

	var id = orderData.id;


    delete orderData.id;
  	Order.findOneAndUpdate({_id : id}, UpdateOption).exec(function(err, order) {
  		
        if(err) {
            cb(err);
        } else {
            cb(null, order);
        }

    });

}

function updateOrder2(id,UpdateOption,cb) {


    Order.findOneAndUpdate({_id : id}, UpdateOption).exec(function(err, order) {
        
        if(err) {
            cb(err);
        } else {
            cb(null, order);
        }

    });

}

function deleteOrder(id, cb) {

  	Order.findOneAndRemove({_id : id }).exec(function(err, order) {

        if(err) {
            cb(err);
        } else {
            cb(null, order);
        }

    });

}

function listOrders(ObiectData,cb) {
if(ObiectData===null)    
	    {Order.find({}).exec(function(err, orders) {

	        if(err) {
	            cb(err);
	        } else {
	            cb(null, orders);
	        }

	    });
    }
    else{
    	 {Order.find(ObiectData).exec(function(err, orders) {

	        if(err) {
	            cb(err);
	        } else {
	            cb(null, orders);
	        }

	     });
    	}
	}
}
function getOrderById(OrderData,cb){
	Order.find({_id:OrderData._id}).exec(function(err,order){
		if(err) {
	            cb(err);
	        } else {
	            cb(null, order);
	        }

	});
};


module.exports = {
    addOrder: addOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    updateOrder2:updateOrder2,
    deleteOrder: deleteOrder,
    listOrders: listOrders,
    getOrderById: getOrderById
};