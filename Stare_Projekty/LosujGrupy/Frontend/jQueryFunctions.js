
$( window ).on('load',function(e){

	var Tab = $("td.Type");


	$(".Choose").hide();

	for(var i = 0;i<Tab.length;i++){
		if(Tab[i].textContent==="Gorliwy"){
			Tab[i].classList.add("Green");
		}else{
			Tab[i].classList.add("Red");
		}
	}


});

$(document).ready(function() {


	$('.Dodaj').on('click',function(e){

		var firstName = $(".Imie")[0].value;
		var lastName = $(".Nazwisko")[0].value;
		var address = $(".Adres")[0].value;
		var email = $(".Email")[0].value;
		var stage = $(".Stan")[0].value;
		var phoneNumber = $(".Telefon")[0].value;
		var status = $(".Status")[0].value;
		var responsable = $(".Odpowiedzialny")[0].checked;
		var cantor = $(".Kantor")[0].checked;
		var WHfirstName = $(".MZImie")[0].value;
		var Member = $(".Czlonek")[0].checked;



		var dane;

		if(stage==="małżeństwo"){

		    var WHfirstName = $(".MZImie")[0].value;
		    var Member = $(".Czlonek")[0].checked;

				 dane={

				imie: firstName,
				nazwisko: lastName,
				adres: address,
				email: email,
				stan: stage,
				telefon:phoneNumber,
				status: status,
				odpowiedzialny: responsable,
				kantor:cantor,
				MZimie: WHfirstName,
				czlonek: Member

				};

			
		}else{
				dane={
				imie: firstName,
				nazwisko: lastName,
				adres: address,
				email: email,
				stan: stage,
				telefon:phoneNumber,
				status: status,
				odpowiedzialny: responsable,
				kantor:cantor
				};	
		}

		$.ajax({
				    type        : "POST",
				    data        :  dane,
				    success     :  function (response){
				    		if(response==="true"){
				    		}
				    		else{
				    			console.log("nie udało sie");
				    		}
				    	}
					});	


	 });
	 
	
	$('#Select').on('click',function(e){
		
		var wartosc = e.target.value;


		if(wartosc==="małżeństwo"){

			$(".Choose").show();

		}else{
			$(".Choose").hide();
		}
			
	});



	$(".Change").on('click',function(e){
		var status = $(e.target).closest(".TR").find(".Type")[0];
		var imie = $(e.target).closest(".TR").find(".IMIE")[0].textContent;
		var nazwisko = $(e.target).closest(".TR").find(".NAZWISKO")[0].textContent;
		var dane;

		console.log(status.textContent);

		if(status.textContent==="Gorliwy"){
			dane={
				imie:imie,
				nazwisko:nazwisko,
				status:"Niegorliwy",
				opcja:"aktualizacja"
			};
		}
		else{
			dane={
				imie:imie,
				nazwisko:nazwisko,
				status:"Gorliwy",
				opcja:"aktualizacja"
			}
		}
		$.ajax({
				    type        : "POST",
				    data        :  dane,
				    success     :  function (response){

		

				    		if(response==="Gorliwy"){

				    			status.textContent=response;
				    			status.classList.remove("Red");
				    			status.classList.add("Green")

				    		}
				    		if(response==="Niegorliwy"){

				    			status.textContent=response;
				    			status.classList.remove("Green");
				    			status.classList.add("Red")
				    		}
				    	}
					});	
		
	});

	$(".Delete").on('click',function(e){

		var imie = $(e.target).closest(".TR").find(".IMIE")[0].textContent;
		var nazwisko = $(e.target).closest(".TR").find(".NAZWISKO")[0].textContent;
		
		var dane={
			imie:imie,
			nazwisko:nazwisko,
			opcja:"usuwanie"
		};

		$.ajax({
				    type        : "POST",
				    data        :  dane,
				    success     :  function (response){
					    	if(response==="Delete"){

					    	$(e.target).closest(".TR").hide();

					    	}

				    	}
				    		
					});	

	});

	$(".GENDER").on('click',function(e){

		var man = $(e.target).closest(".DIV").find(".Man")[0];
		var imie = $(e.target).closest(".TR").find(".IMIE")[0].textContent;
		var nazwisko = $(e.target).closest(".TR").find(".NAZWISKO")[0].textContent;
		var plec;

		(man.checked===true)? plec="meżczyzna" : plec="kobieta";


		
		var dane={
			imie:imie,
			nazwisko:nazwisko,
			plec: plec,
			opcja:"plec"
		};

		$.ajax({
				    type        : "POST",
				    data        :  dane,
				    success     :  function (response){
					    		
					    		console.log(response);

				    	}
				    		
					});	

	});


	$("#myInput").on("keyup", function() {

    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      
    });
  });





});



