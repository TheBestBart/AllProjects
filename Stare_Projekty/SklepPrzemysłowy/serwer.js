const express = require("express");
const app  = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



const Product = require("./BazaDanych/Product");
const User = require("./BazaDanych/User");
const Order = require("./BazaDanych/Order");
const Bin = require("./BazaDanych/Bin");
const hbs = require("express-handlebars");
var passwordHash = require('password-hash');

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine","handlebars");


app.use(express.static("public"));
app.use(express.static("public/img-ogrod"));
app.use(express.static("public/img-dom"));
app.use(express.static("frontend"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());





//------------------------------URL ZWIAZENE Z INFORMACJAMI SKLEPU-----------------------------------------
app.get("/", function(req, res) {
       res.clearCookie("email");
        res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:""
        }); 
});

//--------------URL ZWIAZANE Z USER-------------------------------------------------------------------------
app.post("/dodano", function(req, res) {
        res.clearCookie("email");
        User.getUserByEmail(req.body.email,function(err,user){
                if(!user){

                    if(req.body.haslo!==req.body.powtorzhaslo||req.body.haslo.length<4){
                        
                        res.render("home",{
                            title:"Rejestracja",
                            content:"podane hasła sie róznią,lub hasło jest zakrótkie"
                        });
                    }else if(req.body.imie==="" || req.body.nazwisko===""||req.body.email===""){

                        res.render("home",{
                            title:"Rejestracja",
                            content:"brak danych"
                        });

                    }else{

                        var hashedPassword = passwordHash.generate(req.body.haslo);
                        req.body.haslo = hashedPassword;
                        
                        User.addUser(req.body,function(err,user){
                            res.render("home", {
                                title: "Pomyślnie Dodano użytkownika",
                                content:err? res.status(404) : `Witaj w naszym Sklepie ${req.body.imie}`
                            });
                        });
                    }
                }else if(err){
                    res.status(404).render("home", {
                                title: "Pomyślnie Dodano użytkownika",
                                content:`Witaj w naszym Sklepie ${req.body.imie}`
                            });

                }else{

                    res.status(403).render("home",{
                            title:"Rejestracja",
                            content:`${req.body.email} jest juz używany przez innego użytkownika`
                        });                
                }
            });

});

      
//----------------------URL ZWIAZANE Z PRODUCT-------------------------------------------------------------

app.get("/ogrodnictwo-wszystkie", function(req, res) {
        res.clearCookie("email");
       Product.list("ogrodnictwo",function(err,product){
            res.render("Host-panel/all-products-from-category", {
                title: "Sklep Przemysłowy - Ogrodnictwo", 
                product:err? res.status(404) : product
        });

            console.log(product.length);
    });

 });
app.get("/dom-wszystkie", function(req, res) {
       res.clearCookie("email");
       Product.list("dom",function(err,product){
            res.render("Host-panel/all-products-from-category", {
                title: "Sklep Przemysłowy - Dom", 
                product:err? res.status(404) : product
        });

            console.log(product.length);
    });

 });


app.post("/product-name",function(req,res){
    res.clearCookie("email");
    Product.getProductByName(req.body.name,function(err,product){      
               
                res.render("Host-panel/product-name", {
                title: "Sklep Przemysłowy - Ogrodnictwo", 
                product:err ? res.status(404).send("not found") : product
                });
               
        });
        

});




///-----------------------------------------Panel Klienta-----------------------------------------------------

app.post('/login',function(req, res){

    

    User.getUserByEmail(req.body.email,function (err,user){

        if(user){
             res.cookie('email',user.email);
            if(passwordHash.verify(req.body.password, user.haslo)===true){

                if(user.admin===false){  
                    res.status(200).render("User-panel/user-panel",{
                    title:"Zalogowano",
                    email:req.body.email,
                    content:"zalogowano pomyślnie"
                    });
                }else{
                    res.status(200).render("Admin-panel/admin-panel",{
                    title:"Zalogowano",
                    email:req.body.email,
                    content:"zalogowano pomyślnie"
                     });
                }
            }else{

                res.status(404).render("home",{
                title:"Logowanie",
                content:`${req.body.email} nie poprawne hasło`
                });
            }
                  
            console.log(user);  
            
             
        }else {
             
               res.render("Host-panel/MainPages", {
               title: "Witaj w naszym sklepie",
               content:`nie ma użytkownika ${req.body.email}`
        }); 
        }

    }); 

    // User.getLogin(req.body,function(err,user){
        
    //     if(user.length===1){


    //         res.cookie('email',user[0].email);

    //         if(user[0].admin===false){  
    //             res.status(200).render("User-panel/user-panel",{
    //             title:"Zalogowano",
    //             email:req.body.email,
    //             content:"zalogowano pomyślnie"
    //             });;
    //         }else{
    //             res.status(200).render("Admin-panel/admin-panel",{
    //             title:"Zalogowano",
    //             email:req.body.email,
    //             content:"zalogowano pomyślnie"
    //         });
    //         }
    //     }else{
    //         res.status(404).render("home",{
    //                         title:"Logowanie",
    //                         content:`${req.body.email} nie istnieje`
    //                     }); 

    //     }
    // });


});

app.post("/admin-add-product", function(req, res) {
        
        if(req.cookies.email ==="bart.lebek@o2.pl") 
        {   
            Product.get(req.body,function(err,product){
                    if(!product){

                        if(req.body.name===""||req.body.kategoria===""||req.body.firma===""||req.body.zdjecie===""||req.body.cena===""){
                            
                            res.render("Admin-panel/homeAdmin",{
                                title:"Nowy Produkt",
                                content:"brak danych, Prosze podać więcej danych"
                            });
                        }

                        else{
                            console.log(req.body.name);
                            Product.add(req.body,function(err,pr){
                                if(err){

                                    res.render("Admin-panel/homeAdmin", {
                                    title: "błąd",
                                    content: "błąd"
                                });

                                }else if(!pr){
                                    res.render("Admin-panel/homeAdmin", {
                                        title: "nie udało się",
                                        content:"nie udało się"
                                    });
                                }
                                else{
                                    res.render("Admin-panel/homeAdmin", {
                                    title: "Pomyślnie Dodano Produkt",
                                    content:`${req.body.name} dodano do bazy pomyślnie`
                                });
                                }
                            });
                        }
                    }else{

                        res.render("Admin-panel/homeAdmin",{
                                title:"Nowy Produkt",
                                content:`${req.body.name} jest juz dostępny`
                            });                
                    }
                });
        }else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
        }


});



app.get("/admin-all",function(req,res){
    if(req.cookies.email ==="bart.lebek@o2.pl")    
    {
        User.listUsers({},function(err,user){
                res.render("Admin-panel/user-wszystkie", {
                    title: "Lista użytkowników",
                    email:req.cookies.email,
                    user:err? res.status(404) : user
            });
        });
    }else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    }
});

app.get("/admin-lista-produktow", function(req, res) {
    if(req.cookies.email ==="bart.lebek@o2.pl") 
    {
      Product.list(null,function(err,product){
            res.render("Admin-panel/all-products", {
                title: "Sklep Przemysłowy - Produkty", 
                email:req.cookies.email,
                product: err? res.status(404) : product
        });

            console.log(product.length);
        });
    }else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    }

 });


app.post("/admin-lista-produktow",function(req,res){
    console.log(req.body);
    if(req.body.opcja==="usuwanie"){
            Product.delete(req.body.name,function(err,product){
                if(err){
                    res.send("Błąd podczas usuwania");
                }else if(!product){
                    res.send("nie ma produktu");
                }
                else{
                    res.send("Pomyślnie usunięto produkt");
                }
            });
    }else if(req.body.opcja==="aktualizacjaProduktu"){

        console.log(req.body);
        var dane={};
        var name={name:req.body.NazwaProduktu};

            dane = {
                name:req.body.name,
                firma:req.body.firma,
                cena:req.body.cena,
                ilosc:req.body.ilosc
            };

       

        Product.update(name,dane,function(err,product){
            if(err){
                console.log("error");
                res.status(404).send("Błąd podczas aktualizacji");
            }else if(!product){
                console.log("brak produktu");
                res.status(404).send("Nie znaleziono produktu");
            }else{
                res.status(200).send(true);
                console.log(product);
            }
        });

    }
    else{
        res.status(403).send("nie znaleziono produktu");
    }
});


app.get("/admin-historia-zamowien", function(req, res) {
    if(req.cookies.email === "bart.lebek@o2.pl") 
    {      
        Order.listOrders(null,function(err,order){
            res.render("Admin-panel/admin-all-orders", {
                title: "Sklep Przemysłowy - Zamówienia", 
                email:req.cookies.email,
                order: err ? res.status(404).send("nie udało sie wyswietlic") : order
            });

        });
    }else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    }

 });

app.post("/admin-historia-zamowien",function(req,res){

   var id = req.body;
        if(req.body.opcja==="otrzymano"){
            Order.updateOrder(id,{otrzymano:true},function(err,order){
                if(err){
                    res.send("Aktualizacja nie udała sie bo jest blad");
                }
                else if(!order){
                    res.send("Aktualizacja nie udała sie"); 
                }
                else{
                    res.send(true);
                }
            });
        }else if(req.body.opcja==="aktualizacja"){
            Order.updateOrder(id,{realizacja:true},function(err,order){
                if(err){
                    res.send("Aktualizacja nie udała sie bo jest blad");
                }
                else if(!order){
                    res.send("Aktualizacja nie udała sie"); 
                }
                else{
                    res.send(true);
                }
            });

        }else{
        

            Order.deleteOrder(req.body.id,function(err,product){
                if(err){
                    res.send("Błąd podczas usuwania");
                }else if(!product){
                    res.send("nie ma produktu");
                }
                else{
                    res.send("Pomyślnie usunięto produkt");
                }
            });
            
        }
});

//-----------------------------------------Panel Uzytkownika-------------------------------------------------


app.post("/user-product-name",function(req,res){
    
    if(req.cookies && req.cookies.email!=="bart.lebek@o2.pl")   
    {  
        if(!req.body.ilosc){       
                Product.getProductByName(req.body.name,function(err,product){
                           
                            res.render("User-panel/user-product-name", {
                            email:req.cookies.email,
                            title: "Sklep Przemysłowy - Ogrodnictwo", 
                            product:err ? res.status(404).send("not found") : product
                            });
                           
                    });
        }else{

            console.log(req.body);
            res.send("1");
            console.log("post name")

        }
    }
    else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    } 
});

app.get("/user-ogrodnictwo-wszystkie", function(req, res) {
    if(req.cookies.email && req.cookies.email!=="bart.lebek@o2.pl")
    {   
       Product.list("ogrodnictwo",function(err,product){
            res.render("User-panel/user-all-products-from-category", {
                email:req.cookies.email,
                title: "Sklep Przemysłowy - Ogrodnictwo", 
                product:err? res.status(404) : product
        });

            console.log(product.length);
        });
    }
    else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    }
 });



app.get("/user-dom-wszystkie", function(req, res) {
    if(req.cookies.email && req.cookies.email!=="bart.lebek@o2.pl")
    {
      Product.list("dom",function(err,product){
            res.render("User-panel/user-all-products-from-category", {
                email:req.cookies.email,
                title: "Sklep Przemysłowy - Dom", 
                product: err? res.status(404) : product
        });

            console.log(product.length);
        });
    }
    else{
            res.render("Host-panel/MainPages", {
            title: "Witaj w naszym sklepie",
            content:"Bartłomiej Łebek"
        });
    }
 });

app.post("/user-dom-wszystkie", function(req, res) {
    
   Product.get2({name:req.body.name},function(err,product){
        if(err){
            res.send("błąd bazy danych");
        }
        else if(product){
            


            if(product[0].ilosc-req.body.ilosc>=0){

                var suma = product[0].cena*req.body.ilosc;
    

                var dane={
                    klient:req.cookies.email,
                    koszyk:{
                        nazwa:req.body.name,
                        firma:req.body.firma,
                        ilosc:req.body.ilosc
                    },
                    suma:suma           
                }
            

                Bin.addBin(dane,function(er,bin){
                    if(bin){
                       Bin.getBin({klient:req.cookies.email},function(e,b){
                        if(err){
                            res.send({wartosc:0,komunikat:"Nie dodałeś nic do koszyka"});
                        }
                        else{
                            res.send({wartosc:b.length,komunikat:"pomyślnie dodano"});
                        }
                       });
                    }
                    else{
                        res.send("nie udało się dodać do koszyka");
                        
                    }
                });
            }

            else{
                res.send({
                    ilosc:product[0].ilosc,
                    komunikat:"Niestety obecnie nie ma odpowiedniej ilości"
                        });
               
            }
        }else
        {
            res.send("błąd");
        }

    });
});

app.post("/user-ogrodnictwo-wszystkie", function(req, res) {
    Product.get2({name:req.body.name},function(err,product){
        if(err){
            res.send("błąd przy dodawaniu do bazy");
        }
        else if(product){
            console.log(product[0]);


            if(product[0].ilosc-req.body.ilosc>=0){

                var suma = product[0].cena*req.body.ilosc;
                console.log(suma);

                var dane={
                    klient:req.cookies.email,
                    koszyk:{
                        nazwa:req.body.name,
                        firma:req.body.firma,
                        ilosc:req.body.ilosc
                    },
                    suma:suma           
                }

                Bin.addBin(dane,function(er,bin){
                    if(bin){
                       Bin.getBin({klient:req.cookies.email},function(e,b){
                        if(err){
                            res.send({wartosc:0,komunikat:"Nie dodałeś nic do koszyka"});
                        }
                        else{
                            res.send({wartosc:b.length,komunikat:"pomyślnie dodano"});
                        }
                       });
                    }
                    else{
                        res.send("nie udało się dodać do koszyka");
                        console.log("nie udało sie");
                    }
                });
            }

            else{
                res.send({
                    ilosc:product[0].ilosc,
                    komunikat:"Niestety obecnie nie ma odpowiedniej ilości"
                        });
                console.log("else")
            }
        }else
        {
            res.send("niestety");
        }

    });
});
app.get("/user-koszyk",function(req,res){

    Bin.getBin({klient:req.cookies.email},function(err,bin){
        if(bin){
            res.render("User-panel/user-bin",{
                title:`${req.cookies.email} koszyk`,
                bin:bin
            });
        }
        else{
            res.send("błąd");
        }

    });

});
app.delete("/user-koszyk",function(req,res){
    if(req.body.opcja==="usunZkoszyka"){
            Bin.DeleteBinById(req.body._id,function(err,bin){
                if(err){
                    res.send("błąd");
                }
                else if(!bin){
                    res.send("brak danych");
                }
                else{
                    res.send(true);
                }
        });
    }else{
       Bin.listBins({klient:req.cookies.email},function(err,bin){
            if(err){
                res.send("nie można usunąć")
            }else if(!bin){
                res.send("brak produktów w koszyku")
            }else{
               for(var i = 0;i<bin.length;i++){
                    Bin.DeleteBinById(bin[i]._id,function(er,b){
                        if(er){
                            console.log("nie udało się usunąć");
                        }else if(!b){
                            console.log("brak produktu");
                        }else{
                            console.log("udało sie usunąć");
                        }
                    });
                    
               }
                res.send(true);
            }
       });
    }
});
app.post("/user-koszyk",function(req,res){

       if(req.body.opcja==="Zamow"){
        Bin.listBins({klient:req.cookies.email},function(err,bin){
            var dane = [];
            if(err){
                res.status(404).send("błąd danych");
            }else if(!bin){
                res.status(404).send("nie znaleziono produktów");
            }else{
                for(var i = 0;i<bin.length;i++){
                    dane.push({nazwa:bin[i].koszyk[0].nazwa,firma:bin[i].koszyk[0].firma,ilosc:bin[i].koszyk[0].ilosc,cena:bin[i].suma})
                }  
                var obiekt = {
                    IdKlient:req.cookies.email,
                    zamowienie:dane,
                    suma:req.body.suma,
                    data:req.body.data,
                    zaplacone:false,
                    otrzymano:false,
                    realizacja:false
                }  
            

                Order.addOrder(obiekt,function(e,order){

                    if(e){
                        res.send("błąd");
                    }
                    else if(!order){
                        res.send("brak danych");
                    }else{
                        res.send("Złożono Zamówienie");
                        for(var i = 0;i<bin.length;i++){
                                    Bin.DeleteBinById(bin[i]._id,function(er,b){
                                        if(er){
                                            console.log("nie udało się usunąć");
                                        }else if(!b){
                                            console.log("brak produktu");
                                        }else{
                                            console.log("udało sie usunąć");
                                        }
                                    });
                                    
                               }
                    }

                }); 
            } 

        });
    } 

});

app.get("/user-historia-Zamowienia", function(req, res) {
   if(req.cookies.email && req.cookies.email!=="bart.lebek@o2.pl"){ 
        Order.listOrders({IdKlient:req.cookies.email},function(err,orders){
            if(err){
                res.status(404).send("błąd podczas pobierania danych");
            }else{
                res.status(200).render("User-panel/HistoryOrders",{
                    title: "Sklep Przemysłowy - Zamówienia",
                    order:orders
                });
            }
        });
    }

});

app.post("/user-historia-Zamowienia",function(req,res){
    if(req.cookies.email && req.cookies.email!=="bart.lebek@o2.pl"){

        if(req.body.opcja==="Platnosc"){
            // Order.getOrder(req.body.IdZamowienia,function(err,order){

            //      if(err){
            //             res.send("Błąd podczas modyfikacji");
            //         }else if(!order){
            //             res.send("nie ma zamówienia");
            //         }
            //         else{
            //             Order.updateOrder(order,{zaplacone:true},function(err,ord){
            //                 if(err){
            //                     res.send("Aktualizacja nie udała sie bo jest blad");
            //                 }
            //                 else if(!ord){
            //                     res.send("Aktualizacja nie udała sie"); 
            //                 }
            //                 else{
            //                     res.send("Pomyślnie aktualizowano zamówienie");
            //                 }
            //            }); 


            //         }
            //  });

             Order.updateOrder2(req.body.IdZamowienia,{zaplacone:true},function(err,order){
                if(err){
                    res.send("Aktualizacja nie udała sie bo jest blad");
                }
                else if(!order){
                    res.send("Aktualizacja nie udała sie"); 
                }
                else{
                    res.send(true);
                }
            });
        }
        else
        {
             Order.deleteOrder(req.body.id, function(err,product){
                    if(err){
                        res.send("Błąd podczas usuwania");
                    }else if(!product){
                        res.send("nie ma produktu");
                    }
                    else{
                        res.send("Pomyślnie usunięto produkt");
                    }
                });

        }
    }


});

app.post("/user-platnosc",function(req,res){

    if(req.cookies.email && req.cookies.email!=="bart.lebek@o2.pl"){
        // console.log(req.body);
       Order.getOrder(req.body.id,function(err,order){
            if(order){
            res.send(JSON.stringify(order));
           

            }else{
                console.log("slabo");
            }
       });
    }

});


app.get("/wylogowano",function(req,res){

    res.clearCookie("email");
    res.render("home",{
            title:"Wylogowano",
            content:"Pomyślnie wylogowano"
            });

});





app.listen(8000,function()
{ 
	console.log("Serwer został uruchomiony pod adresem http://localhost:8000");
});


   // }else if(req.body.opcja==="dodawanie"){
    // }else{
    //      Product.getProductByName2(req.body.name,function(err,product){
    //                 if(product.length===0){

    //                     if(req.body.name===""||req.body.kategoria===""||req.body.firma===""||req.body.zdjecie===""||req.body.cena===""){
                            
    //                         res.send("brak danych, Prosze podać więcej danych");
                            
    //                     }

    //                     else{
    //                         var dane={
    //                             name:req.body.name,
    //                             kategoria:req.body.kategoria,
    //                             firma:req.body.firma,
    //                             ilosc:req.body.ilosc,
    //                             cena:req.body.cena,
    //                             zdjecie:req.body.zdjecie
    //                             }

    //                             console.log("dane" + dane);
    //                         Product.add(dane,function(err,product){

    //                             console.log("to jest produkt" + product);
    //                             res.send(`${req.body.name} dodano do bazy pomyślnie`);
    //                         });
    //                     }
    //                 }else{

    //                     res.send(`${req.body.name} jest juz dostępny`);             
    //                 }
    //             });
    // }






    // console.log(req.cookies);
    // Bin.listBins({email:req.cookies.email},function(err,bin){
    //     if(err){
    //         res.send(err);
    //         console.log(err)
    //     }else if(!bin){
    //         Bin.addBin(req.body,function(er,b){
    //             // if(err){
    //             //     console.log("nie udało sie dodać do koszyka");
    //             // }else if(!b){

    //             // }
    //             console.log("to jest b" + b);
    //         });
    //     }else{
    //         // res.send(bin.koszyk);
    //         console.log()
    //     }
    // });
    // console.log(req.body);

    // console.log(req.body);
    // console.log(req.body);