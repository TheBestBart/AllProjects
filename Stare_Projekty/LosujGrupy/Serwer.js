const express = require("express");
const app  = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const passwordHash = require('password-hash');

const Neon = require("./DataBase/Neobrother.js");

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine","handlebars");


app.use(express.static("Public"));
app.use(express.static("Frontend"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var cors = require('express-cors')
 
app.use(cors({
    allowedOrigins: [
        'github.com', 'google.com','localhost:3000'
    ]
}))




app.get("/", function(req, res) {

        res.render("AllPanels/MainPanel", {
            title: "Chrystus Zmartwychwstał!",
            content:""
        }); 
});
app.get("/AddMember",function(req,res){

	res.render("AllPanels/AddNeon",{
		title: "Chrystus Zmartwychwstał!",
        content:""

	});

});
app.post("/AddMember",function(req,res){
	console.log(req.body);
	
	var dane = req.body;
			Neon.addNeon(dane,function(err,neon){
		                if(err){

		                		res.send("false");
		                }else{
		                		res.send("true");
		                 
		                }
	 });
			
});

app.get("/dla_reacta", (req,res) => {
	res.send({name : "bartak"})
})
app.post("/dla_reacta", (req,res) => {
	console.log(req.body);
})


app.get("/ComunityList",function(req,res){

			Neon.listNeon(null,function(err,neon){
                res.render("AllPanels/ComunityList", {
                    title: "Chrystus Zmartwychwstał",
                    neon:err? console.log(err): neon
            });

        });


	 });

app.post("/ComunityList",function(req,res){

var dane ={
			imie:req.body.imie,
			nazwisko:req.body.nazwisko
		};

if(req.body.opcja === "aktualizacja"){
		var daneZmienne={
			status:req.body.status
		};

		Neon.updateNeon(dane,daneZmienne,function(err,neon){
			console.log(neon);
			if(err){
				console.log(err);
			}else{
				if(req.body.status==='Niegorliwy'){
					res.send("Niegorliwy");

				}
				else{
					res.send("Gorliwy");
				}
			}

		});
	}else if(req.body.opcja === "usuwanie"){
		Neon.deleteNeon(dane,function(err,neon){
			if(err){
				console.log(err);
			}else{
				res.send("Delete");
			}
		});
	}else{
		var dane = {
			imie:req.body.imie,
			nazwisko:req.body.nazwisko
		};
		var daneZmienne = {
			plec:req.body.plec
		};

		Neon.updateNeon(dane,daneZmienne,function(err,neon){
			if(err){
				console.log(err);
			}else{
				res.send("dodano pleć");
				console.log(neon);
			}

		});
	}

});

app.get("/Responsables",function(req,res){
	Neon.listNeon({odpowiedzialny:true},function(err,neon){
		res.render("AllPanels/ComunityList", {
                    title: "Chrystus Zmartwychwstał",
                    neon:err? console.log(err): neon
			});
		});
	 });

app.get("/Cantors",function(req,res){

			Neon.listNeon({kantor:true},function(err,neon){
                res.render("AllPanels/ComunityList", {
                    title: "Chrystus Zmartwychwstał",
                    neon:err? console.log(err): neon
            });

        });
	 });

app.get("/Random",function(req,res){
	res.render("AllPanels/RandomPeople", {
                    title: "Chrystus Zmartwychwstał"
            });
});

app.get("/Groups",function(req,res){

	// deklaracja zmiennych
	var Odpowiedzialni = [];
	var MezowieGorliwi = [];
	var BraciaGorliwi = [];
	var MezowieNiegorliwi = [];
	var BraciaNiegorliwi = []; 
	var SumaGorliwych;
	var SumaNiegorliwych;
	var SumaOgolna;
	var tablicaGrup = [];
	var dlugoscMezowieGorliwyh;
	var dlugoscBraciGorliwych;
	var dlugoscBraciNiegorliwych;
	var dlugoscMezowieNiegorliwych;
	var dlugoscOdpowiedzialni;
	var Gorliwi;
	var LiczbaOdpowiedzialnychMalzenst=0;
	
		//pobranie z bazy danych listy braci bez odpowiedzialnych
	Neon.listNeon(null,function(err,neon){

				if(err){
					console.log(err);

				}else{

					// petla dodajaca do kazdej z tablic braci, grupujac ich na odpowiednie kategorie: niegorliwi,gorliwi itp
						for(var i=0;i<neon.length;i++){
							if(neon[i].odpowiedzialny===true && neon[i].plec==="kobieta" && neon[i].stan==="małżeństwo" && neon[i].czlonek===true){

							}else if(neon[i].odpowiedzialny===true){

								Odpowiedzialni.push(neon[i]);

							}else if(neon[i].plec==="meżczyzna"&&  neon[i].stan==="małżeństwo" && neon[i].status==="Gorliwy"){

								MezowieGorliwi.push({imie: neon[i].imie + " " +  neon[i].nazwisko,Zona: neon[i].MZimie});

							}else if(neon[i].plec==="meżczyzna" && neon[i].stan==="małżeństwo" && neon[i].status==="Niegorliwy"){

								MezowieNiegorliwi.push({imie: neon[i].imie + " " + neon[i].nazwisko, Zona: neon[i].MZimie});

							}else if(neon[i].stan!=="małżeństwo" && neon[i].status==="Gorliwy"){
								
								BraciaGorliwi.push({imie:neon[i].imie + " " +  neon[i].nazwisko});
							
							}else if(neon[i].stan!=="małżeństwo" && neon[i].status==="Niegorliwy" || neon[i].stan==="małżeństwo" && neon[i].status==="Niegorliwy" && neon[i].czlonek===false){
								BraciaNiegorliwi.push({imie:neon[i].imie + " " +  neon[i].nazwisko});
								console.log(neon[i]);
							}else{

							}
						}


						

						// do poprawy: zamiast tablice tablic zrobic jedna tablice o nazwie tablica grup i dodawac do kazdego elementu tablicy odpowiedzialnego
			// tablicaGrup = [grupa1,grupa2,grupa3,grupa4,grupa5,grupa6];

			console.log("tyle jest neonow : " + neon.length);
			dlugoscOdpowiedzialni = Odpowiedzialni.length;

			for(var i=0;i<dlugoscOdpowiedzialni;i++){
						var NumerOsoby = Math.floor(Math.random() * Odpowiedzialni.length);
						tablicaGrup[i] = [];
						tablicaGrup[i].push({imie:Odpowiedzialni[NumerOsoby].imie + " " +Odpowiedzialni[NumerOsoby].nazwisko});
						
						if(Odpowiedzialni[NumerOsoby].MZimie && Odpowiedzialni[NumerOsoby].czlonek === true){

						tablicaGrup[i].push({imie:Odpowiedzialni[NumerOsoby].MZimie});	
						LiczbaOdpowiedzialnychMalzenst + 1;

						}
						Odpowiedzialni.splice(NumerOsoby,1);

			}


					


		dlugoscMezowieGorliwych = MezowieGorliwi.length  // potrzebne do petli losujacej GorliwychMezow do grup
		dlugoscBraciGorliwych = BraciaGorliwi.length // potrzebne do petli losujacej gorliwych braci do grup
		dlugoscBraciNiegorliwych = BraciaNiegorliwi.length //potrzebe do petli losujacej niegorliwych braci do grup
		dlugoscMezowieNiegorliwych = MezowieNiegorliwi.length //potrzebne do petli losujacej mezow gorliwych do grup



		Gorliwi = BraciaGorliwi.length + (MezowieGorliwi.length*2) + tablicaGrup.length + LiczbaOdpowiedzialnychMalzenst // do wykresu z bootstrapa



		SumaGorliwych = (BraciaGorliwi.length+(2*MezowieGorliwi.length)) / tablicaGrup.length; // ilosc gorliwych braci na kazda grupe;
		SumaNiegorliwych = (BraciaNiegorliwi.length+(2*MezowieGorliwi.length))/tablicaGrup.length; // ilosc niegorliwcyh brai na kazda grupe
		SumaOgolna = parseInt(SumaNiegorliwych+SumaGorliwych); // suma gorliwych i niegorliwych braci w grupie

		


					for(var i=0;i<dlugoscMezowieGorliwych;i++){

						var NumerMezow = Math.floor(Math.random() * MezowieGorliwi.length);


						tablicaGrup[i].push({imie:MezowieGorliwi[NumerMezow].imie});
						tablicaGrup[i].push({imie:MezowieGorliwi[NumerMezow].Zona});
						MezowieGorliwi.splice(NumerMezow,1);

					}


			
					for(var i = 0; i < tablicaGrup.length; i++){
						
						if(i <= tablicaGrup.length - 2){

							while( tablicaGrup[i].length <= SumaGorliwych + 1){

								var NumerBraci = Math.floor(Math.random() * BraciaGorliwi.length);
								tablicaGrup[i].push({imie:BraciaGorliwi[NumerBraci].imie});
								BraciaGorliwi.splice(NumerBraci,1);	

							}
						}else{

							while( BraciaGorliwi.length > 0){
								
								var NumerBraci = Math.floor(Math.random() * BraciaGorliwi.length);
								tablicaGrup[i].push({imie:BraciaGorliwi[NumerBraci].imie});
								BraciaGorliwi.splice(NumerBraci,1);	
														
							}
						}
					}
					

					for(var i = 0; i < dlugoscMezowieNiegorliwych; i++){
						
						var NumerMezow = Math.floor(Math.random() * MezowieGorliwi.length);
						tablicaGrup[i].push({imie:MezowieNiegorliwi[NumerMezow].imie});
						tablicaGrup[i].push({imie:MezowieNiegorliwi[NumerMezow].Zona});
						MezowieNiegorliwi.splice(NumerMezow,1);

					}


					console.log("dlugosc braci niegorliwi " + dlugoscBraciNiegorliwych);
					if(dlugoscBraciNiegorliwych <= 1){

							tablicaGrup[ tablicaGrup.length - 1 ].push({imie:BraciaNiegorliwi[0].imie}); 
							console.log(" to sie wykonało" + BraciaNiegorliwi[0].imie);
					}else{
						for(var i = 0; i<dlugoscBraciNiegorliwych;i++){

							if(i<=tablicaGrup.length-2){


								while(tablicaGrup[i].length < SumaOgolna + 1){

									var NumerBraci = Math.floor(Math.random() * BraciaNiegorliwi.length);
									console.log(BraciaNiegorliwi[NumerBraci]);
									tablicaGrup[i].push({imie:BraciaNiegorliwi[NumerBraci].imie});
									BraciaNiegorliwi.splice(NumerBraci,1);			
								}
							}else{

								while(BraciaNiegorliwi.length > 0){
									
									var NumerBraci = Math.floor(Math.random() * BraciaNiegorliwi.length);
									tablicaGrup[i].push({imie:BraciaNiegorliwi[NumerBraci].imie});
									BraciaNiegorliwi.splice(NumerBraci,1);								
								}
							}
						}
					}	

					var gorliwi = (Gorliwi/neon.length)*100;

					gorliwi = gorliwi.toString();
					gorliwi = gorliwi.slice(0,5);

					res.render("AllPanels/AllGroups", {
                    title: "Chrystus Zmartwychwstał",
                    grupa1: err? console.log(err) : tablicaGrup[0],
                    grupa2: err? console.log(err) : tablicaGrup[1],
                    grupa3: err? console.log(err) : tablicaGrup[2],
                    grupa4: err? console.log(err) : tablicaGrup[3],
                    grupa5: err? console.log(err) : tablicaGrup[4],
                    grupa6: err? console.log(err) : tablicaGrup[5],
                    suma:err?console.log(err): neon.length,
                    Gorliwi: gorliwi

                    
				 });
				
				}




			});

			
	
});



app.listen(8000,function()
{ 
	console.log("Serwer został uruchomiony pod adresem http://localhost:8000");
});


// console.log("Mezowie gorliwi plus zony : " + MezowieGorliwi.length*2);
					// console.log("Mezowie niegorliwi plus zony : " + MezowieNiegorliwi.length*2);
					// console.log("bracia gorliwi : " + BraciaGorliwi.length);
					// console.log("bracia niegorliwi: " + BraciaNiegorliwi.length);
					// console.log("odpowiedzialnych jest :"  + Odpowiedzialni.length);



					// console.log("gorliwi :"+ Gorliwi);
		// console.log("Mezowie gorliwi plus zony : " + MezowieGorliwi.length*2);
		// console.log("Mezowie niegorliwi plus zony : " + MezowieNiegorliwi.length*2);
		// console.log("bracia gorliwi : " + BraciaGorliwi.length);
		// console.log("bracia niegorliwi: " + BraciaNiegorliwi.length);
		// console.log("odpowiedzialnych jest :"  + Odpowiedzialni.length);


// console.log("ilosc braci niegorliwych na grupe: "+ SumaNiegorliwych);
					// console.log("ilosc braci gorliwych na grupe: "+ SumaGorliwych);
					// console.log("suma wszystkich braci na grupe:" + parseInt(SumaGorliwych + SumaNiegorliwych) );
					// console.log("---------------------GRUPA 1-------------------------");
					// console.log(grupa1);
					// console.log("grupa1 dlugosc:" + grupa1.length);
					// console.log("---------------------GRUPA 2------------------------");
					// console.log(grupa2);
					// console.log("grupa2 dlugosc:" + grupa2.length);
					// console.log("---------------------GRUPA 3-------------------------");
					// console.log(grupa3);
					// console.log("grupa3 dlugosc:" + grupa3.length);
					// console.log("---------------------GRUPA 4-------------------------");
					// console.log(grupa4);
					// console.log("grupa4 dlugosc:" + grupa4.length);
					// console.log("---------------------GRUPA 5-------------------------");
					// console.log(grupa5);
					// console.log("grupa5 dlugosc:" + grupa5.length);
					// console.log("---------------------GRUPA 6-------------------------");
					// console.log(grupa6);
					// console.log("grupa6 dlugosc:" + grupa6.length);

					

					// tablicaGrup = ["-----------------GRUPA 1------------------",grupa1,
					// "--------------------GRUPA 2----------------------",grupa2,
					// "--------------------GRUPA 3----------------------",grupa3,
					// "--------------------GRUPA 4----------------------",grupa4,
					// "--------------------GRUPA 5----------------------",grupa5,
					// "--------------------GRUPA 6----------------------",grupa6];

					// res.send(tablicaGrup);






					// if(tablicaGrup[i].length<=SumaGorliwych){

						// 		tablicaGrup[i].push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }else if(tablicaGrup[i].length<=SumaGorliwych){

						// 		grupa2.push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }else if(grupa3.length<=SumaGorliwych){

						// 		grupa3.push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }else if(grupa4.length<=SumaGorliwych){

						// 		grupa4.push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }else if(grupa5.length<=SumaGorliwych){

						// 		grupa5.push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }else{
						// 		grupa6.push({imie:BraciaGorliwi[NumerBraci].imie});
						// 		BraciaGorliwi.splice(NumerBraci,1);

						// }



						// var NumerBraci = Math.floor(Math.random() * BraciaNiegorliwi.length); 
						// if(grupa1.length<SumaOgolna+1){

						// 		grupa1.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);

						// }else if(grupa2.length<SumaOgolna+1){

						// 		grupa2.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);

						// }else if(grupa3.length<SumaOgolna+1){

						// 		grupa3.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);

						// }else if(grupa4.length<SumaOgolna+1){

						// 		grupa4.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);

						// }else if(grupa5.length<SumaOgolna+1){

						// 		grupa5.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);

						// }else{
						// 		grupa6.push({imie:BraciaNiegorliwi[NumerBraci].imie});
						// 		BraciaNiegorliwi.splice(NumerBraci,1);
						// }



// // do poprawy: zamiast tablice tablic zrobic jedna tablice o nazwie tablica grup i dodawac do kazdego elementu tablicy odpowiedzialnego
// 			// tablicaGrup = [grupa1,grupa2,grupa3,grupa4,grupa5,grupa6];
// 			dlugoscOdpowiedzialni = Odpowiedzialni.length;
// 			for(var i=0;i<dlugoscOdpowiedzialni;i++){
// 						// var NumerGrupy = Math.floor(Math.random() * tablicaGrup.length);
// 						var NumerOsoby = Math.floor(Math.random() * Odpowiedzialni.length);
// 						tablicaGrup[i] = [];
// 						tablicaGrup[i].push({imie:Odpowiedzialni[NumerOsoby].imie + " " +Odpowiedzialni[NumerOsoby].nazwisko});
// 						// tablicaGrup[NumerGrupy].push({imie:Odpowiedzialni[NumerOsoby].imie + " " +Odpowiedzialni[NumerOsoby].nazwisko});

// 						if(Odpowiedzialni[NumerOsoby].MZimie && Odpowiedzialni[NumerOsoby].czlonek === true){
// 						tablicaGrup[i].push({imie:Odpowiedzialni[NumerOsoby].MZimie});	
// 						LiczbaOdpowiedzialnychMalzenst + 1;
// 						}

// 						// tablicaGrup.splice(NumerGrupy,1);
// 						Odpowiedzialni.splice(NumerOsoby,1);

// 					}
