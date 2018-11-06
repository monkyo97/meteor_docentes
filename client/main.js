
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Accounts } from 'meteor/accounts-base';

import './main.html';

docentes = new Mongo.Collection("Docentes");
tematicas = new Mongo.Collection("Tematicas");


if(Meteor.isClient){
	Deps.autorun( function(){
		Meteor.subscribe("docentes");
		Meteor.subscribe("tematicas");
		Meteor
})

var pass_log;
var L  = 0;
var Ma = 0;
var Mi = 0;
var J  = 0;
var V  = 0;

/****************************************************************************************/
/******************************** LOGUEA AL USUARIO *************************************/
/****************************************************************************************/

Template.login.events({
	'submit form': function(event,Template){
		event.preventDefault();
		var usr= event.target.usr.value;
		pass_log= event.target.pass.value;
		Meteor.loginWithPassword(usr,pass_log);
		console.log("Iniciando...");
		console.log(pass_log);
	}
});

/*function changepass(pass)
{

	//var ced = Meteor.users.findOne().profile.cedula;

	return Meteor.users.findOne().profile.cedula;
}*/

Template.baseLayout.events({
	'click #blogout' : function(){
		return Accounts.logout();

	}
});




/****************************************************************************************/
/********************************* REGISTRA AL USUARIO **********************************/
/****************************************************************************************/

Template.datos.events({
	'submit form': function (event, template) {
		event.preventDefault();
		var cedu = event.target.cedu.value;
		console.log(pass_log);
		console.log(cedu);
		if(pass_log == cedu){
			alert("Cambiar Password para poder guardar");
		}else{
			var nomb= event.target.nomb.value;
			var apell1= event.target.apell1.value;
			var apell2= event.target.apell2.value;
			var correo= event.target.correo.value;
			var fech1= event.target.fecha1.value;
			var fech2= event.target.fecha2.value;
			var fech3= event.target.fecha3.value;
			var fech4= event.target.fecha4.value;
			var fech5= event.target.fecha5.value;
			
			var ch = document.getElementById('conth').value;  //si no hay 5 horarios escogidos no guarda
	         	if(ch == "Cantidad de Horarios: 5"){
		         	docentes.insert({
		         		cedula: cedu,
		         		nombre: nomb,
		         		apellido1: apell1,
		         		apellido2: apell2,
		         		correo: correo,
						tematicas: {
		         			fecha1 : fech1,
							fecha2 : fech2,
							fecha3 : fech3,
							fecha4 : fech4,
							fecha5 : fech5
		         		}
					});	
		          	alert("Datos Validos");
		          	//document.getElementById('bhorarios').disabled = true;
		          	L  = 0;
					Ma = 0;
					Mi = 0;
					J  = 0;
					V  = 0;
				}else{
					alert("Faltan Horarios");
				}
		}		
	},
	'click #bhorarios': function(event, Template){

		event.preventDefault();
		//Reinica el select del contador y coloca la default opcion
		borrarhorarios();
	}
	
});

/****************************************************************************************/
/********************************** CAMBIAR PASSWORD ************************************/
/****************************************************************************************/

Template.Cambiar.events({
	'submit form': function(event, Template) {
	  	event.preventDefault();
	    var viejo = event.target.actual.value;
	   	pass_log = event.target.nueva.value;
		Accounts.changePassword(viejo,pass_log);
		console.log("Cambiada");
		event.target.actual.value = "";
		event.target.nueva.value="";
		alert("Password modificado correctamente");
	}
})

/****************************************************************************************/
/********************************** BORRAR HORARIOS *************************************/
/****************************************************************************************/
function borrarhorarios(){

	var opc =  $('select[id=tematica] option').removeAttr("disabled");
		$('.opc1').attr("disabled", true);

		for (var i = 0, lo = opc.length; i < lo ; i++) {
			opc[i].selected = opc[i].defaultSelected;
		}

		for (var i = 1; i < 6; i++) {
			document.getElementById('fecha'+i).value = "";
		}
		for (var i = 1; i < 9; i++) {
			document.getElementById('l'+i).disabled = false;
			document.getElementById('l'+i).className = "btn btn-success";
		}
		for (var i = 1; i < 9; i++) {
			document.getElementById('ma'+i).disabled = false;
			document.getElementById('ma'+i).className = "btn btn-success"; 
		}
		for (var i = 1; i < 9; i++) {
			document.getElementById('mi'+i).disabled = false;
			document.getElementById('mi'+i).className = "btn btn-success";
		}
		for (var i = 1; i < 9; i++) {
			document.getElementById('j'+i).disabled = false; 
			document.getElementById('j'+i).className = "btn btn-success";
		}
		for (var i = 1; i < 9; i++) {
			document.getElementById('v'+i).disabled = false; 
			document.getElementById('v'+i).className = "btn btn-success"; 
		}
		document.getElementById('conth').value = "Cantidad de Horarios: 0 de 5";
		document.getElementById('bguardar').disabled = true;
		L  = 0;
		Ma = 0;
		Mi = 0;
		J  = 0;
		V  = 0;

}

/****************************************************************************************/
/****************************** Validaciones de ingreso *********************************/
/****************************************************************************************/
function validar_correo_institucional(email)
{
	var expresion = /^[a-z][\w.-]+@utm.edu.ec$/i;
	if (expresion.test(email)){
	    return(true);
	}else
	    return(false);
}

function validar_correo(email)
{
	var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	if (expresion.test(email)){
	    return(true);
	}else
	    return(false);
}

function validar_cedula(cedul)
 {      
 	var total = 0;
    var longitud = cedul.length;
    var longcheck = longitud - 1;
	    if (longitud === 10){
   		   for(i = 0; i < longcheck; i++){
       			if (i%2 === 0) {
       			   	var aux = cedul.charAt(i) * 2;
        			if (aux > 9) aux -= 9;
       					total += aux;
			    }else{
     			 	total += parseInt(cedul.charAt(i)); // parseInt o concatenará en lugar de sumar
    			}
      		}
      		total = total % 10 ? 10 - total % 10 : 0;
		    if (cedul.charAt(longitud-1) == total) 
		    	{return(true);
		    }else{
	        	alert("Cedula Inválida!!"); return(false);
	      	}
		}else{
			alert("Debe Ingresar los 10 digitos de su cedula!!"); return(false);
		}
}


function validar_nombres (nombre){
	if(nombre.length < 3 ){
    return (false);
	}
}
function validar_numeros (valor){
	var longitud = valor.length;
	for(i = 0; i < longitud ; i++){
		va=parseInt(valor.charAt(i));
		if(!isNaN(va)){
		 	alert ("No puede contener numeros el Nombre o Apellido!!");
			return (false);
		}
	}
	return (true);	
}
/**********************************************************************************************/
/************************** EVENTO EN CADA BUTTON DE LA TABLA**********************************/
/**********************************************************************************************/
Template.tabla.events({
	/*******************************************************************---> LUNES <---******************/
	'click #l1': function(event,Template) {	event.preventDefault(); console.log(horario(1,1)); 	},
	'click #l2': function(event,Template) {	event.preventDefault();	console.log(horario(1,2)); 	},
 	'click #l3': function(event,Template) {	event.preventDefault();	console.log(horario(1,3));	},
 	'click #l4': function(event,Template) {	event.preventDefault();	console.log(horario(1,4));	},
 	'click #l5': function(event,Template) {	event.preventDefault();	console.log(horario(1,5));	},
 	'click #l6': function(event,Template) {	event.preventDefault();	console.log(horario(1,6)); 	},
 	'click #l7': function(event,Template) {	event.preventDefault();	console.log(horario(1,7)); 	},	
 	'click #l8': function(event,Template) {	event.preventDefault();	console.log(horario(1,8)); 	},
 	/*******************************************************************---> MARTES <---******************/
 	'click #ma1': function(event,Template) { event.preventDefault(); console.log(horario(2,1));	},
	'click #ma2': function(event,Template) { event.preventDefault(); console.log(horario(2,2));	},
 	'click #ma3': function(event,Template) { event.preventDefault(); console.log(horario(2,3));	},
 	'click #ma4': function(event,Template) { event.preventDefault(); console.log(horario(2,4));	},
 	'click #ma5': function(event,Template) { event.preventDefault(); console.log(horario(2,5));	},
 	'click #ma6': function(event,Template) { event.preventDefault(); console.log(horario(2,6)); },
 	'click #ma7': function(event,Template) { event.preventDefault(); console.log(horario(2,7));	},
 	'click #ma8': function(event,Template) { event.preventDefault(); console.log(horario(2,8)); },
 	/*******************************************************************---> MIERCOLES <---******************/
 	'click #mi1': function(event,Template) { event.preventDefault(); console.log(horario(3,1)); },
	'click #mi2': function(event,Template) { event.preventDefault(); console.log(horario(3,2));	},
 	'click #mi3': function(event,Template) { event.preventDefault(); console.log(horario(3,3));	},
 	'click #mi4': function(event,Template) { event.preventDefault(); console.log(horario(3,4)); },
 	'click #mi5': function(event,Template) { event.preventDefault(); console.log(horario(3,5));	},
 	'click #mi6': function(event,Template) { event.preventDefault(); console.log(horario(3,6)); },
 	'click #mi7': function(event,Template) { event.preventDefault(); console.log(horario(3,7)); },
 	'click #mi8': function(event,Template) { event.preventDefault(); console.log(horario(3,8));	},
 	/*******************************************************************---> JUEVES <---******************/
 	'click #j1': function(event,Template) {	event.preventDefault();	console.log(horario(4,1));  },
	'click #j2': function(event,Template) {	event.preventDefault();	console.log(horario(4,2)); 	},
 	'click #j3': function(event,Template) {	event.preventDefault();	console.log(horario(4,3)); 	},
 	'click #j4': function(event,Template) {	event.preventDefault();	console.log(horario(4,4)); 	},
 	'click #j5': function(event,Template) {	event.preventDefault();	console.log(horario(4,5)); 	},
 	'click #j6': function(event,Template) {	event.preventDefault();	console.log(horario(4,6));	},
 	'click #j7': function(event,Template) {	event.preventDefault();	console.log(horario(4,7)); 	},
 	'click #j8': function(event,Template) {	event.preventDefault();	console.log(horario(4,8)); 	},
/*******************************************************************---> VIERNES <---******************/
 	'click #v1': function(event,Template) {	event.preventDefault(); console.log(horario(5,1));	},
	'click #v2': function(event,Template) {	event.preventDefault();	console.log(horario(5,2)); 	},
 	'click #v3': function(event,Template) {	event.preventDefault(); console.log(horario(5,3));	},
 	'click #v4': function(event,Template) {	event.preventDefault();	console.log(horario(5,4));	},
 	'click #v5': function(event,Template) {	event.preventDefault();	console.log(horario(5,5)); 	},
 	'click #v6': function(event,Template) {	event.preventDefault(); console.log(horario(5,6));	},
 	'click #v7': function(event,Template) {	event.preventDefault(); console.log(horario(5,7));	},
 	'click #v8': function(event,Template) {	event.preventDefault();	console.log(horario(5,8)); 	}
});

/****************************************************************************************/
/***************************** Funcion para guardar el Horario***************************/
/****************************************************************************************/
function horario(d,h)
{ 
	if(d==1){var dia="Lunes"; L+=1;}
	else if(d==2){var dia="Martes"; Ma+=1;}
	else if(d==3){var dia="Miercoles"; Mi+=1;}
	else if(d==4){var dia="Jueves"; J+=1;}
	else if(d==5){var dia="Viernes"; V+=1;}
	else {console.log("Dia no valido")}

	if(h==1){var hora="08:00 - 09:00"}
	else if(h==2){var hora="09:00 - 10:00"}
	else if(h==3){var hora="10:00 - 11:00"}
	else if(h==4){var hora="11:00 - 12:00"}
	else if(h==5){var hora="14:30 - 15:30"}
	else if(h==6){var hora="15:30 - 16:30"}
	else if(h==7){var hora="16:30 - 17:30"}
	else if(h==8){var hora="17:30 - 18:30"}
	else {console.log("Hora no valida")}

	
	var f1 = document.getElementById('fecha1').value;
	var f2 = document.getElementById('fecha2').value;
	var f3 = document.getElementById('fecha3').value;
	var f4 = document.getElementById('fecha4').value;
	var f5 = document.getElementById('fecha5').value;
	var tema = document.getElementById('tematica').value;
	var temdis = $('select[id="tematica"] option:selected').text();


	if(tema=='opc1'){alert("Tematica no escogida");}

	else{
		if($('.temap').val() != null){
			desabilitardia(d,h);  // Llama a deshabilitar DIA boton
			//desabilitar_dias(L,Ma,Mi,J,V); // Llama a deshabilitar COLUMNA boton
			$('select[id="tematica"] option:selected').attr("disabled", true);
			if (f1=="") {document.getElementById('fecha1').value = dia+' '+hora+': '+temdis; document.getElementById('conth').value = "Cantidad de Horarios: 1";}
				else if (f2=="") {document.getElementById("fecha2").value = dia+' '+hora+': '+temdis; document.getElementById('conth').value = "Cantidad de Horarios: 2";}
				else if (f3=="") {document.getElementById("fecha3").value = dia+' '+hora+': '+temdis; document.getElementById('conth').value = "Cantidad de Horarios: 3";}
				else if (f4=="") {document.getElementById("fecha4").value = dia+' '+hora+': '+temdis; document.getElementById('conth').value = "Cantidad de Horarios: 4";}
				else if (f5=="") {
				document.getElementById("fecha5").value = dia+' '+hora+': '+temdis; 
				document.getElementById('conth').value = "Cantidad de Horarios: 5";
				document.getElementById('bguardar').disabled = false;

			
			}
			else {console.log("Todas han sido seleccionadas ");}
		}else{
			alert("Tematica ya seleccinada");
		}
	}
}
/****************************************************************************************/
/***************************Cambiar el color al boton y desabilitar los demas***************************/
/****************************************************************************************/
function desabilitardia(d,h){
	for (c = 1; c < 9; c++) {
		if(d==1){
	  		document.getElementById("l"+h).className = "btn btn-danger "; 
	  		document.getElementById('l'+c).disabled = true;
	  	}
	  	if(d==2){
	  		document.getElementById("ma"+h).className = "btn btn-danger"; 
			document.getElementById('ma'+c).disabled = true;
	  	}
	  	if(d==3){
	  		document.getElementById("mi"+h).className = "btn btn-danger"; 
	  		document.getElementById("mi"+c).disabled = true; 
	  	}
	  	if(d==4){
			document.getElementById("j"+h).className = "btn btn-danger"; 
			document.getElementById("j"+c).disabled = true; 
	  	}
	  	if(d==5){
			document.getElementById("v"+h).className = "btn btn-danger"; 
			document.getElementById("v"+c).disabled = true; 
	  	}
	}
	
	return true;
}
/****************************************************************************************/
/***************************Cambiar el color al boton ***********************************/
/****************************************************************************************/
function desabilitar_dias(L,Ma,Mi,J,V){
	for (c = 1; c < 9; c++) {
		if(L==2){
	  		document.getElementById('l'+c).disabled = true;
	  	}
	  	if(Ma==2){
	  		document.getElementById('ma'+c).disabled = true;
	  	}
	  	if(Mi==2){
	  		document.getElementById("mi"+c).disabled = true; 
	  	}
	  	if(J==2){
			document.getElementById("j"+c).disabled = true; 
	  	}
	  	if(V==2){
			document.getElementById("v"+c).disabled = true; 
	  	}
	}
	
	return true;
}
/****************************************************************************************/
/****************************** Mostrar todas las tematicas******************************/
/****************************************************************************************/
Template.tabla.helpers({
	mostrar(){
		return tematicas.find().fetch();
	}
})

Template.mostrar.helpers({
	show(){
		return docentes.find().fetch();
	}
});

}