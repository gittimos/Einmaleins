'use strict';
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
    	if(Object.keys(this.attributes).length === 0) {
        this.attributes['correct'] = 0;
        this.attributes['gamesPlayed'] = 0;
    }
        this.emit(':tell', 'Los geht es!');
    },
	'GetNewExerciseIntent': function () {
		var a = Math.floor(Math.random() * 10)+1;
		var b = Math.floor(Math.random() * 10)+1;	
		
		this.attributes["result"] = a * b;
        this.attributes["gamesPlayed"] += 1;

        var speechOutput = "Was ist " + a + " mal " + b;
        this.emit(':ask', speechOutput);
    },
    'GetAnswerIntent': function () {
		var guessNum = this.event.request.intent.slots.zahl.value;
		var zahlen = {"Eins":"1","Zwei":"2","Drei":"3","Vier":"4","Fünf":"5","Sechs":"6","Sieben":"7","Acht":"8","Neun":"9","Zehn":"10","Elf":"11","Zwölf":"12","Dreizehn":"13","Vierzehn":"14","Fünfzehn":"15","Sechszehn":"16","Siebzehn":"17","Achtzehn":"18","Neunzehn":"19","Zwanzig":"20","Einundzwanzig":"21","Zweiundzwanzig":"22","Dreiundzwanzig":"23","Vierundzwanzig":"24","Fünfundzwanzig":"25","Sechsundzwanzig":"26","Siebenundzwanzig":"27","Achtundzwanzig":"28","Neunundzwanzig":"29","Dreißig":"30","Einunddreißig":"31","Zweiunddreißig":"32","Dreiunddreißig":"33","Vierunddreißig":"34","Fünfunddreißig":"35","Sechsunddreißig":"36","Siebenunddreißig":"37","Achtunddreißig":"38","Neununddreißig":"39","Vierzig":"40","Einundvierzig":"41","Zweiundvierzig":"42","Dreiundvierzig":"43","Vierundvierzig":"44","Fünfundvierzig":"45","Sechsundvierzig":"46","Siebenundvierzig":"47","Achtundvierzig":"48","Neunundvierzig":"49","Fünfzig":"50","Einundfünfzig":"51","Zweiundfünfzig":"52","Dreiundfünfzig":"53","Vierundfünfzig":"54","Fünfundfünfzig":"55","Sechsundfünfzig":"56","Siebenundfünfzig":"57","Achtundfünfzig":"58","Neunundfünfzig":"59","Sechzig":"60","Einundsechzig":"61","Zweiundsechzig":"62","Dreiundsechzig":"63","Vierundsechzig":"64","Fünfundsechzig":"65","Sechsundsechzig":"66","Siebenundsechzig":"67","Achtundsechzig":"68","Neunundsechzig":"69","Siebzig":"70","Einundsiebzig":"71","Zweiundsiebzig":"72","Dreiundsiebzig":"73","Vierundsiebzig":"74","Fünfundsiebzig":"75","Sechsundsiebzig":"76","Siebenundsiebzig":"77","Achtundsiebzig":"78","Neunundsiebzig":"79","Achtzig":"80","Einundachtzig":"81","Zweiundachtzig":"82","Dreiundachtzig":"83","Vierundachtzig":"84","Fünfundachtzig":"85","Sechsundachtzig":"86","Siebenundachtzig":"87","Achtundachtzig":"88","Neunundachtzig":"89","Neunzig":"90","Einundneunzig":"91","Zweiundneunzig":"92","Dreiundneunzig":"93","Vierundneunzig":"94","Fünfundneunzig":"95","Sechsundneunzig":"96","Siebenundneunzig":"97","Achtundneunzig":"98","Neunundneunzig":"99","Hundert":"100"};
        var speechOutput;

		if(zahlen[guessNum] === this.attributes["result"]) {
			this.attributes["correct"] += 1;
			speechOutput = "Richtig!";
     	}
		else {
			speechOutput = "Du hast " + zahlen[guessNum] + " gesagt. Richtig ist " + this.attributes["result"];
		}

        this.emit(':tell', speechOutput);
    },
    'GetNewNumberIntent': function () {
    	var guessNum = this.event.request.intent.slots.zahl.value;
     	var zahlen = {"Eins":"1","Zwei":"2","Drei":"3","Vier":"4","Fünf":"5","Sechs":"6","Sieben":"7","Acht":"8","Neun":"9","Zehn":"10","Elf":"11","Zwölf":"12","Dreizehn":"13","Vierzehn":"14","Fünfzehn":"15","Sechszehn":"16","Siebzehn":"17","Achtzehn":"18","Neunzehn":"19","Zwanzig":"20","Einundzwanzig":"21","Zweiundzwanzig":"22","Dreiundzwanzig":"23","Vierundzwanzig":"24","Fünfundzwanzig":"25","Sechsundzwanzig":"26","Siebenundzwanzig":"27","Achtundzwanzig":"28","Neunundzwanzig":"29","Dreißig":"30","Einunddreißig":"31","Zweiunddreißig":"32","Dreiunddreißig":"33","Vierunddreißig":"34","Fünfunddreißig":"35","Sechsunddreißig":"36","Siebenunddreißig":"37","Achtunddreißig":"38","Neununddreißig":"39","Vierzig":"40","Einundvierzig":"41","Zweiundvierzig":"42","Dreiundvierzig":"43","Vierundvierzig":"44","Fünfundvierzig":"45","Sechsundvierzig":"46","Siebenundvierzig":"47","Achtundvierzig":"48","Neunundvierzig":"49","Fünfzig":"50","Einundfünfzig":"51","Zweiundfünfzig":"52","Dreiundfünfzig":"53","Vierundfünfzig":"54","Fünfundfünfzig":"55","Sechsundfünfzig":"56","Siebenundfünfzig":"57","Achtundfünfzig":"58","Neunundfünfzig":"59","Sechzig":"60","Einundsechzig":"61","Zweiundsechzig":"62","Dreiundsechzig":"63","Vierundsechzig":"64","Fünfundsechzig":"65","Sechsundsechzig":"66","Siebenundsechzig":"67","Achtundsechzig":"68","Neunundsechzig":"69","Siebzig":"70","Einundsiebzig":"71","Zweiundsiebzig":"72","Dreiundsiebzig":"73","Vierundsiebzig":"74","Fünfundsiebzig":"75","Sechsundsiebzig":"76","Siebenundsiebzig":"77","Achtundsiebzig":"78","Neunundsiebzig":"79","Achtzig":"80","Einundachtzig":"81","Zweiundachtzig":"82","Dreiundachtzig":"83","Vierundachtzig":"84","Fünfundachtzig":"85","Sechsundachtzig":"86","Siebenundachtzig":"87","Achtundachtzig":"88","Neunundachtzig":"89","Neunzig":"90","Einundneunzig":"91","Zweiundneunzig":"92","Dreiundneunzig":"93","Vierundneunzig":"94","Fünfundneunzig":"95","Sechsundneunzig":"96","Siebenundneunzig":"97","Achtundneunzig":"98","Neunundneunzig":"99","Hundert":"100"};
        var speechOutput = zahlen[guessNum];
        this.emit(':tell', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = 'Hilfe';
        var reprompt = 'Hilf';
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Abbrechen');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Stop');
    },
     'Unhandled': function() {
        var message = 'Das verstehe ich nicht.';
        this.emit(':tell', message, message);
    }
};