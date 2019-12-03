

$(document).ready(function() {
    
	var CenaTab = [];
	var suma = 0;
	var CENA = document.querySelectorAll(".cena");

	for(var i=0;i<CENA.length;i++){
		var zmienna = CENA[i].textContent;
		CenaTab.push(parseFloat(CENA[i].textContent));
		suma+=CenaTab[i];
		
	}
	$(".Suma").text(suma+".00 zł");


	//--------------------------Zamowienia--------------------------------------------------------------------
	//zaplac
	$(".zaplac").on('click',function(e){
		var zaplacono = e.target.parentElement.parentElement.children[4].children[0].children[0].children[1];
		var otrzymano = e.target.parentElement.parentElement.children[4].children[0].children[1].children[1];
		
		if(zaplacono.textContent ==="false"){
			alert("klient jeszcze nie zapłacił");
		}
		else if(zaplacono.textContent==="true" && otrzymano.textContent==="false"){
			
			var ten = e.target.parentElement.parentElement.children[0].textContent;
				var dane={
					id : ten,
					opcja:"otrzymano"
				};
			var YesNo = confirm("Czy napewno otrzymano należność?");
			if(YesNo===true){
				$.ajax({
			    type        : "POST",
			    data        :  dane,
			    success     :  function (response){
			    		if(response===true){
			    			otrzymano.textContent = "true";
			    			alert("pomyślnie aktualizowano");
			    		}
			    		else{
			    			alert(response);
			    		}
			    	}
				});
			}
		}	
		else{
			alert("Zamówienie zostało już aktualizowane");
		}
	});
	//aktualizuj
	$(".aktualizacja").on('click',function(e){
			var zaplacono = e.target.parentElement.parentElement.children[4].children[0].children[0].children[1];
			var otrzymano = e.target.parentElement.parentElement.children[4].children[0].children[1].children[1];
			var realizacja = e.target.parentElement.parentElement.children[4].children[0].children[2].children[1];
			
			if(zaplacono.textContent ==="false"){
			alert("klient jeszcze nie zapłacił");
			}else if(otrzymano.textContent==="false" && zaplacono.textContent==="true"){
				alert("Nie otrzymano jeszcze należności za zamówienie");
			}
			else if(otrzymano.textContent==="true" && zaplacono.textContent==="true" && realizacja.textContent==="false"){   
			    var ten = e.target.parentElement.parentElement.children[0].textContent;

				var dane={
					id : ten,
					opcja:"aktualizacja"
				};
				var YesNo = confirm("Czy napewno zamówienie zostało zrealizowane?");
				if(YesNo===true)
				{
					$.ajax({
					    type        : "post",
					    data        :  dane,
					    success     :  function (response){
					    	if(response===true){
					    		realizacja.textContent = "true";
					    	}
					    	else{
					    		alert(response);
					    	}
			    		}
					});
				}
		}

		else{
			alert("Zamówienie zostało już aktualizowane");
		}
	});

	//usun
	$(".usunZamowienie").on('click',function(e){
		console.log("usuwanie");
		var YesNo = confirm("Czy napewno chcesz usunąć zamówienie?");
		var ten = e.target.parentElement.parentElement.children[0].textContent;

		var tenParent = e.target.parentElement.parentElement;

		var dane={
			id : ten,
			opcja:"usun"
			};
		if(YesNo===true){
				$.ajax({
					 // url         : "/admin-historia-zamowien",
					 type        : "post",
					 data        :  dane,
					 success     :  function (response){
					 	tenParent.classList.add("DoUsuniecia");
						alert(response); 
						$(".DoUsuniecia").remove();
					 }
				});
		}else{
			alert("anulowano usuwanie");
		}
		
		
	})

	//-------------------------------------------koszyk-------------------------------------------------------------

	//-----------------------------------------Produkty (modyfikacja i usuwanie) -------------------------------------
	$(".minus").on('click',function(e){
		var YesNo = confirm("Czy napewno chcesz usunąć produkt?");
		var ten = e.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent;
		var tenParent = e.target.parentElement.parentElement.parentElement.parentElement;
		console.log(tenParent);
		if(YesNo===true)

		{
		console.log(ten);
		$.ajax({
			type:"post",
			data: {name:ten,opcja:"usuwanie"},
			success : function(response){
				tenParent.classList.add("DoUsuniecia");
				alert(response);
				$(".DoUsuniecia").remove();
			}
		});
		}
		else{

			alert("anulowano usuwanie");
		}	
	});

	$(".AktualizujProdukt").on('click',function(e){
		var ten = e.target;
		var ul = ten.parentElement.parentElement;
		var tr = ul.parentElement.parentElement.parentElement;
		var nazwa = ul.children[0].children[1].value;
		var firma = ul.children[1].children[1].value;
		var cena = ul.children[2].children[1].value;
		var ilosc= ul.children[3].children[1].value;

		var NazwaProduktu = tr.children[0].children[0];
		var Firma = tr.children[1].children[0];
		var Cena = tr.children[2].children[0];
		var Ilosc = tr.children[3].children[0];

			if(ilosc==="" && cena==="" && firma==="" && nazwa===""){
				alert("Brak Danych");
			}else{
						if(firma===""){
							firma  = Firma.textContent;
						}
						if(nazwa===""){
							nazwa = NazwaProduktu.textContent;
						}

						if(cena===""){
							cena=Cena.textContent;
							cena = parseFloat(cena,10);
						}
						else cena = parseFloat(cena,10);
						console.log("cena");


						if(ilosc===""){
							ilosc=Ilosc.textContent;
							ilosc = parseInt(ilosc,10);
						
						}
						else ilosc = parseInt(ilosc,10);

					if(isNaN(ilosc)===true||isNaN(cena)===true){

						console.log(ilosc);
						console.log(cena);

						alert("Podano złe dane");

					}else{
					
					var	dane={
								NazwaProduktu:NazwaProduktu.textContent,
								name:nazwa,
								firma:firma,
								cena:cena,
								ilosc:ilosc,
								opcja:"aktualizacjaProduktu"
						};


						var YesNo = confirm("Aktualizować przedmiot?");
						if(YesNo===true){
							$.ajax({
								type:"post",
								data:dane,
								success:function(response){
										if(response===true){
											NazwaProduktu.textContent = nazwa;
											Firma.textContent = firma;
											Cena.textContent = cena+ ".00 zł";
											Ilosc.textContent = ilosc;
											alert("Zmiany zostały wprowadzone");
										}else{
										alert(response);
										}
									}		

								});
						}
				}
			}
		
	});

	//--------------------------------------nowy produkt---------------------------------------------





	$(".koszyk").on('click',function(e){
		 var name = e.target.parentElement.parentElement.children[0].textContent;
		 var firma = e.target.parentElement.parentElement.children[1].textContent;
		 var cena =  e.target.parentElement.parentElement.children[2].textContent;
		 var ilosc = e.target.parentElement.parentElement.children[4].children[0].children[0].value;
		 	var dane={
					name : name,
					firma:firma,
					cena:parseFloat(cena),
					ilosc:ilosc,
					opcja:"koszyk"
				};

		var YesNo=confirm("Dodać do koszyka?");
		if(YesNo===true){
				$.ajax({
			    type        : "post",
			    data        :  dane,
			    success     :  function (response){
			    	if(response.komunikat){
				    	$(".kosz").text(response.wartosc);
			    	}else{
			    		alert(response);
			    	}
			    }
			});
		}

	});

	$(".WyczyscKoszyk").on('click',function(e){
		var table = e.target.parentElement.children[1];
		console.log(table);
		var YesNo = confirm("Napewno opróżnić koszyk?")
		if(YesNo===true){
			$.ajax({
				type:"delete",
				data:{opcja:"WyczyscKoszyk"},
				success:function(response){
					if(response===true){
						$(table).html( "<h1 class=/home-title/>Brak wyników</h1><p class=/home-content/>Twoj koszyk jest pusty</p>");
						$(".Zamow").hide();
						$(e.target).hide();
					}
					else{
						alert(response);
					}
				}
			});
		}
	});

	$(".usunZkoszyka").on('click',function(e){
		var id = e.target.parentElement.parentElement.children[0].textContent; 
		var cena = e.target.parentElement.parentElement.children[2].textContent;
		var tr = e.target.parentElement.parentElement;
		tr.classList.add("DoUsuniecia");
		var dane = {
			_id :id,
			opcja :"usunZkoszyka"
		}

		var YesNo = confirm("Usunąć z koszyka?")
		if(YesNo===true){
			$.ajax({

				type        : "delete",
			    data        :  dane,
			    success     :  function (response){
			    	if(response===true){
			    		tr.classList.add("DoUsuniecia");
			    		$(".DoUsuniecia").remove();
			    		suma= suma - parseFloat(cena);
			    		$(".Suma").text(suma+".00 zł");

			    	}
			    }
			});
		}
	});

	$(".Zamow").on("click",function(e){

	var date = new Date();
	date = date.toLocaleDateString();
	var dane = {

		data:date,
		suma:suma,
		opcja:"Zamow"

	}
	console.log(date);
	var YesNo = confirm("Czy chcesz złożyć zamówienie?")
	if(YesNo===true){
		$.ajax({

			type:"post",
			data: dane,
			success:function(response){
				alert(response);
			}

		});
	}


	});


	$(".Zamowiono").on('click',function(e){
		

		

		var ten = e.target;
		var ul = ten.parentElement.parentElement;
		var tr = ul.parentElement.parentElement.parentElement;
		var IdZamowienia = tr.children[0].textContent;
		var Zaplacone = tr.children[4];
		
					var	dane={
								IdZamowienia:IdZamowienia,
								opcja:"Platnosc"
						};



						var YesNo = confirm("Wykonać płatność");
						if(YesNo===true){
							$.ajax({
								type:"post",
								data:dane,
								success:function(response){
										if(response===true){
											Zaplacone.textContent = "true";
										}	
									}		

								});
						}
				
			
		
	});

});












