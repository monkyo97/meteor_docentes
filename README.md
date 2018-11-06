# meteor_docentes
Un sistema de tutorias de horarios para los docentes de la Universidad Técnica de Manabí usando Meteor como base para el desarrollo en el cual se escogen 2 temas para ver en un día y se desabilitaran los demás horarios del mismo día. 
* Cada tema escogido debe deshabilitarse 

El código está desarrollado de la manera más entendible posible y de manera antigua, conformado por If - Else If 

## La manera de desabilitar los días del Calendario es si existen 2 seleccionados, desabilita los demas horarios del día 
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
