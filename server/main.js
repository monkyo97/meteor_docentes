import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';




if(Meteor.isServer){
	Meteor.startup( function(){
		docentes = new Mongo.Collection("Docentes");
		tematicas = new Mongo.Collection("Tematicas");

		Meteor.publish("docentes", function(){
			return docentes.find({});
		})
		Meteor.publish("tematicas", function(){
			return tematicas.find({});
		})
	});
	console.log("Iniciando Servidor...");
	
}

