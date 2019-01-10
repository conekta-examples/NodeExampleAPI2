var conekta = require('conekta');
conekta.api_key = 'key_aFyhrz5wU7qyQfaxfy5p6g';
conekta.api_version = '2.0.0';

var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
// const simpleIcons = require('simple-icons');
var oxxo = [
        {ref: "Aún no has creado una referencia"}
    ];
var spei = [
        {clabe: "Aún no has creado una Clabe de cobro"}
    ];


 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
	
});
///////////////////////////////////////////////////////////////////////////////////
app.get("/card", function(req, res){
	res.render("newCard");
});

app.post("/card", function(req, res){
	var token = req.body.conektaTokenId;
order = conekta.Order.create({
   "line_items": [{
        "name": "Tacos",
        "unit_price": 1000,
        "quantity": 6
    }],
    "shipping_lines": [{
        "amount": 1000,
        "carrier": "FEDEX"
    }], //shipping_lines - physical goods only
    "currency": "MXN",
    "customer_info": {
      'name': 'Fulanito Pérez',
      'email': 'fulanito@conekta.com',
      'phone': '+52181818181'
    },
    "shipping_contact":{
     "address": {
       "street1": "Calle 123, int 2",
       "postal_code": "06100",
       "country": "MX"
     }
   },  //shipping_contact - required only for physical goods
    "metadata": { "description": "Compra de creditos: 300(MXN)", "reference": "1334523452345" },
    "charges":[{
    "payment_method": {
      //'monthly_installments':9, 
      'type': 'card',
      'token_id': token
    } 
    }]

}, function(err, res) {
    if(err){
      console.log(err);
      return;
    }
});
res.render("orden");
});

// // UPDATE ORDER CON INFO EN METADATA
// conekta.Order.find("ord_2hFmUB1FWBrdfnMjj", function(err, order) {
//   order.update({
//     "metadata": {"ref": "123abc"}
//   }, function(err, res) {
//     console.log(res.toObject());
//   });
// });


// // ANADIR CHARGE PARA COBRAR ORDER
// conekta.Order.find("ord_2hFmUB1FWBrdfnMjj", function(err, order) {
//     order.createCharge({
//     "payment_method": {
//       "type": "default"
//     }
//   }, function(err, charge) {
//         console.log(charge);
//     });
// });



// conekta.Order.find('ord_2hMKgYu9knTbMmiwp', function (err, order) {
//   if (err) {
//    console.log(err)
//    return;
//   }
//   order.capture(function (errCapture, capture) {
//    console.log('errCapture', errCapture);
//  console.log('capture', capture);
//   });
// });


//Capturar orden preautorizada
// var order = conekta.Order.find('ord_2jQMWD1N3b2RczVuX', function(err, order) {
//   order.capture(function(err, res) {
//   });
// });

//cancelar orden
// curl -H "Accept: application/vnd.conekta-v2.0.0+json" \      
// -H "Content-type: application/json" \      
// -u key_aFyhrz5wU7qyQfaxfy5p6g: \     
// -X POST https://api.conekta.io/orders/ord_2jQMsHaAHjFGYj9bM/void  

//////////////////////////////////////////////////////////////////////////////////////////// 

app.get("/oxxo", function(req, res){
  res.render("oxxo", {oxxo:oxxo}); 
});

app.post("/oxxo", function(req, res){
    var name = req.body.name;
    var precio = req.body.precio;
    var cantidad = req.body.cantidad;
    order = conekta.Order.create({
          "line_items": [{
              "name": name,
              "unit_price": precio,
              "quantity": cantidad
          }],
          "shipping_lines": [{
              "amount": 1500,
              "carrier": "FEDEX"
          }], //shipping_lines - phyiscal goods only
          "currency": "MXN",
          "customer_info": {
            "name": "Fulanito Pérez",
            "email": "fulanito@conekta.com",
            "phone": "+5218181818181"
          },
          "shipping_contact":{
             "address": {
               "street1": "Calle 123, int 2",
               "postal_code": "06100",
               "country": "MX"
             }
          }, //shipping_contact - required only for physical goods
          "charges":[{
            "payment_method": {
              "type": "oxxo_cash"
              //Utiliza este timestamp para fijar la fecha de expiracion de la orden
              //"expires_at": 1668211200
            }
          }]
    }, function(req, ord) {
          var ord = ord.toObject();
          console.log(ord.charges.data[0].payment_method.reference);
          console.log(ord.charges.data[0].payment_method.reference);
          var ref = ord.charges.data[0].payment_method.reference;
          var newOxxo = {ref : ref};
          oxxo.push(newOxxo);
          res.redirect("oxxo");
      });
  });
    
         

  app.get("/oxxo/new", function(req, res){
    res.render("oxxonew");
});

///////////////////////////////////////////////////////////////////////////  

app.get("/spei", function(req, res){
  res.render("spei", {spei:spei}); 
});

app.post("/spei", function(req, res){
    var name = req.body.name;
    var precio = req.body.precio;
    var cantidad = req.body.cantidad;
    order = conekta.Order.create({
          "line_items": [{
              "name": name,
              "unit_price": precio,
              "quantity": cantidad
          }],
          "shipping_lines": [{
              "amount": 1500,
              "carrier": "FEDEX"
          }], //shipping_lines - phyiscal goods only
          "currency": "MXN",
          "customer_info": {
            "name": "Fulanito Pérez",
            "email": "fulanito@conekta.com",
            "phone": "+5218181818181"
          },
          "shipping_contact":{
             "address": {
               "street1": "Calle 123, int 2",
               "postal_code": "06100",
               "country": "MX"
             }
          }, //shipping_contact - required only for physical goods
          "charges":[{
            "payment_method": {
              "type": "spei"
              //Utiliza este timestamp para fijar la fecha de expiracion de la orden
              //"expires_at": 1668211200
            }
          }]
    }, function(req, ord) {
          var ord = ord.toObject();
          console.log("CLABE: " + ord.charges.data[0].payment_method.receiving_account_number);
          var clabe = ord.charges.data[0].payment_method.receiving_account_number;
          var newSpei = {clabe : clabe};
          spei.push(newSpei);
          // console.log(spei.length)
          res.redirect("spei");
      });
  });
    
         

  app.get("/spei/new", function(req, res){
    res.render("speinew");
});

 /////////////////////////////////// 

//This is the webhook
//https://developers.conekta.com/resources/webhooks
 app.post("/webwook", function(req, res) {
        res.sendStatus(200);
        // console.log(req.body);   
        });


var server = app.listen(3005, function(){
	console.log("Server has started!!!", server.address().port);
});

