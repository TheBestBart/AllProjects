var nav = document.querySelector("#nav");
var buttonZaloguj = document.getElementById("buttonZaloguj");
var body = document.querySelector('body');
var top = document.querySelector('#top');
var div = document.getElementById('TenDiv');

var trKoszyk = document.querySelectorAll(".koszyk");


function Hide(){
	if(document.cookie==="email=bart.lebek%40o2.pl"){
		nav.classList.add("hide");
    }else if(document.cookie!=="" && document.cookie!=="email=bart.lebek%40o2.pl"){
		nav.classList.add("hide");
    }
    else{
    	nav.classList.remove("hide");
    }

}


function AddClass(){
	var nav = document.querySelector("#nav");
	var name = "hide"
 	var arr = nav.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
}



top.addEventListener('load',Hide);


