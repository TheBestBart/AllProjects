
var zmienna = new Date();


var nowa =  new Date();

function UstawDate(rok,miesiac,dzien,godzina,minuta,sekunda,milisekunda);
{
	nowa = new Date(rok,miesiac,dzien,godzina,minuta,sekunda,milisekunda);
}

setInterval("UstawDate(2018,1,19,20,45,0,0)",1000);