'use strict';
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit("StartIntent", true);
    },

	'StartIntent': function () {
		if(Object.keys(this.attributes).length === 0) {
	        this.attributes['score'] = 0;
	        this.attributes['gamesPlayed'] = 0;
	        this.attributes['result'] = 'na';
		}
		var speechOutput = 'Willkommen bei Einmaleins. Lass uns gleich anfangen. ';
	    this.emit('NewExercise',speechOutput);      
	},
	'AnswerIntent': function () {
		var guessNum = this.event.request.intent.slots.zahl.value;
		var zahlen = {"Eins":"1","Zwei":"2","Drei":"3","Vier":"4","Fünf":"5","Sechs":"6","Sieben":"7","Acht":"8","Neun":"9","Zehn":"10","Elf":"11","Zwölf":"12","Dreizehn":"13","Vierzehn":"14","Fünfzehn":"15","Sechszehn":"16","Siebzehn":"17","Achtzehn":"18","Neunzehn":"19","Zwanzig":"20","Einundzwanzig":"21","Zweiundzwanzig":"22","Dreiundzwanzig":"23","Vierundzwanzig":"24","Fünfundzwanzig":"25","Sechsundzwanzig":"26","Siebenundzwanzig":"27","Achtundzwanzig":"28","Neunundzwanzig":"29","Dreißig":"30","Einunddreißig":"31","Zweiunddreißig":"32","Dreiunddreißig":"33","Vierunddreißig":"34","Fünfunddreißig":"35","Sechsunddreißig":"36","Siebenunddreißig":"37","Achtunddreißig":"38","Neununddreißig":"39","Vierzig":"40","Einundvierzig":"41","Zweiundvierzig":"42","Dreiundvierzig":"43","Vierundvierzig":"44","Fünfundvierzig":"45","Sechsundvierzig":"46","Siebenundvierzig":"47","Achtundvierzig":"48","Neunundvierzig":"49","Fünfzig":"50","Einundfünfzig":"51","Zweiundfünfzig":"52","Dreiundfünfzig":"53","Vierundfünfzig":"54","Fünfundfünfzig":"55","Sechsundfünfzig":"56","Siebenundfünfzig":"57","Achtundfünfzig":"58","Neunundfünfzig":"59","Sechzig":"60","Einundsechzig":"61","Zweiundsechzig":"62","Dreiundsechzig":"63","Vierundsechzig":"64","Fünfundsechzig":"65","Sechsundsechzig":"66","Siebenundsechzig":"67","Achtundsechzig":"68","Neunundsechzig":"69","Siebzig":"70","Einundsiebzig":"71","Zweiundsiebzig":"72","Dreiundsiebzig":"73","Vierundsiebzig":"74","Fünfundsiebzig":"75","Sechsundsiebzig":"76","Siebenundsiebzig":"77","Achtundsiebzig":"78","Neunundsiebzig":"79","Achtzig":"80","Einundachtzig":"81","Zweiundachtzig":"82","Dreiundachtzig":"83","Vierundachtzig":"84","Fünfundachtzig":"85","Sechsundachtzig":"86","Siebenundachtzig":"87","Achtundachtzig":"88","Neunundachtzig":"89","Neunzig":"90","Einundneunzig":"91","Zweiundneunzig":"92","Dreiundneunzig":"93","Vierundneunzig":"94","Fünfundneunzig":"95","Sechsundneunzig":"96","Siebenundneunzig":"97","Achtundneunzig":"98","Neunundneunzig":"99","Hundert":"100","eins":"1","zwei":"2","drei":"3","vier":"4","fünf":"5","sechs":"6","sieben":"7","acht":"8","neun":"9","zehn":"10","elf":"11","zwölf":"12","dreizehn":"13","vierzehn":"14","fünfzehn":"15","sechszehn":"16","siebzehn":"17","achtzehn":"18","neunzehn":"19","zwanzig":"20","einundzwanzig":"21","zweiundzwanzig":"22","dreiundzwanzig":"23","vierundzwanzig":"24","fünfundzwanzig":"25","sechsundzwanzig":"26","siebenundzwanzig":"27","achtundzwanzig":"28","neunundzwanzig":"29","dreißig":"30","einunddreißig":"31","zweiunddreißig":"32","dreiunddreißig":"33","vierunddreißig":"34","fünfunddreißig":"35","sechsunddreißig":"36","siebenunddreißig":"37","achtunddreißig":"38","neununddreißig":"39","vierzig":"40","einundvierzig":"41","zweiundvierzig":"42","dreiundvierzig":"43","vierundvierzig":"44","fünfundvierzig":"45","sechsundvierzig":"46","siebenundvierzig":"47","achtundvierzig":"48","neunundvierzig":"49","fünfzig":"50","einundfünfzig":"51","zweiundfünfzig":"52","dreiundfünfzig":"53","vierundfünfzig":"54","fünfundfünfzig":"55","sechsundfünfzig":"56","siebenundfünfzig":"57","achtundfünfzig":"58","neunundfünfzig":"59","sechzig":"60","einundsechzig":"61","zweiundsechzig":"62","dreiundsechzig":"63","vierundsechzig":"64","fünfundsechzig":"65","sechsundsechzig":"66","siebenundsechzig":"67","achtundsechzig":"68","neunundsechzig":"69","siebzig":"70","einundsiebzig":"71","zweiundsiebzig":"72","dreiundsiebzig":"73","vierundsiebzig":"74","fünfundsiebzig":"75","sechsundsiebzig":"76","siebenundsiebzig":"77","achtundsiebzig":"78","neunundsiebzig":"79","achtzig":"80","einundachtzig":"81","zweiundachtzig":"82","dreiundachtzig":"83","vierundachtzig":"84","fünfundachtzig":"85","sechsundachtzig":"86","siebenundachtzig":"87","achtundachtzig":"88","neunundachtzig":"89","neunzig":"90","einundneunzig":"91","zweiundneunzig":"92","dreiundneunzig":"93","vierundneunzig":"94","fünfundneunzig":"95","sechsundneunzig":"96","siebenundneunzig":"97","achtundneunzig":"98","neunundneunzig":"99","hundert":"100"};
        var speechOutput;

		if(zahlen[guessNum] === this.attributes["result"]) {
			this.attributes["score"] += 1;
			speechOutput = "Richtig! ";
     	}
		else speechOutput = zahlen[guessNum] + " ist falsch, richtig ist " + this.attributes["result"] + ". ";
		
		this.attributes["gamesPlayed"] += 1;
        this.emit('NewExercise',speechOutput);
    },
	'NewExercise': function (feedback) {
		var a = Math.floor(Math.random() * 10)+1;
		var b = Math.floor(Math.random() * 10)+1;	
		var result = a * b;
		
		this.attributes["result"] = result.toString();
     
        var speechOutput = feedback + "Was ist " + a + " mal " + b;
        this.emit(':ask', speechOutput);
    },
    'StopIntent': function () {
        var speechOutput = 'Ok, dann machen wir Schluss. Du hast ' + this.attributes['score'] + ' von ' + this.attributes['gamesPlayed'] + ' Aufgaben richtig gelöst.';
        var reprompt = 'Ok, dann machen wir Schluss.';
        this.emit(':tell', speechOutput, reprompt);
    },
    'HelpIntent': function () {
        var speechOutput = 'Ich stelle dir Einmaleins-Aufgaben. Du sagst mir das Ergebnis und sich sage dir, ob das richtig war. Ich stelle dir solange Aufgaben, bis du sagst, dass du aufhören möchtest.';
        var reprompt = 'Ich stelle dir solange Einmaleins-Aufgaben, bis du sagst, dass du aufhören möchtest.';
        this.emit(':tell', speechOutput, reprompt);
    },
    'Unhandled': function () {
        var speechOutput = 'Entschuldige, das verstehe ich leider nicht. Bitte sage eine Zahl, Hilfe oder Ende.';
        var reprompt = 'Das verstehe ich leider nicht.';
        this.emit(':ask', speechOutput, reprompt);
    },
     "AMAZON.HelpIntent": function() {
        var newGame = (this.attributes["speechOutput"] && this.attributes["repromptText"]) ? false : true;
        this.emit("HelpIntent");
    },
};