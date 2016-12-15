'use strict';

var languageString = {
    "de-DE": {
        "translation": {
            "PROBLEM_MESSAGE": "Was ist %s mal %s? ",
            "FEEDBACK_CORRECT": "Richtig! ",
            "FEEDBACK_WRONG": "%s ist falsch, richtig ist %s. <break time='0.5s'/> ",
            "STARTOVER_MESSAGE": "Okay. Dann fangen wir neu an. ",
            "WELCOME_MESSAGE": "Willkommen bei Einmaleins. Lass uns gleich anfangen. ",
            "STOP_MESSAGE": "Ok, dann machen wir Schluss. Du hast %s von %s Aufgaben richtig gelöst. Bis zum nächsten Mal. ",
            "UNHANDLED_MESSAGE": "Entschuldige, das verstehe ich leider nicht. Bitte sage eine Zahl, Hilfe oder Ende. ",
            "UNHANDLED_REPROMPT": "Das verstehe ich leider nicht. ",
            "HELP_MESSAGE": "Ich stelle dir solange Aufgaben, bis du Stopp sagst. Bitte sage mir das Ergebnis als Zahl. ",
            "HELP_REPROMPT": "Bitte sage mir das Ergebnis als Zahl oder sage Stopp. "
        }
    }
};

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.a74c2018-d295-4e9e-bd90-eee4a9762f7c";
    alexa.resources = languageString;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'LaunchRequest': function () {
        var speechOutput = this.t("WELCOME_MESSAGE");
        this.emit('Init',speechOutput);      
    },
    'Init': function (message) {
        if(Object.keys(this.attributes).length === 0) {
            this.attributes['score'] = 0;
            this.attributes['gamesPlayed'] = 0;
            this.attributes['result'] = 'na';
        }
        this.emit('NewExercise',message);      
    },
    'StartOver': function () {
        var speechOutput = this.t("STARTOVER_MESSAGE");
        this.emit('Init',speechOutput);      
    },
	'NewExercise': function (message) {
		var a = Math.floor(Math.random() * 10)+1;
		var b = Math.floor(Math.random() * 10)+1;	
		var result = a * b;
		
		this.attributes["result"] = result.toString();
     
        var speechOutput = message + this.t("PROBLEM_MESSAGE", a, b);
        this.emit(':ask', speechOutput);
    },
    'AnswerIntent': function () {
        var guessNum = this.event.request.intent.slots.zahl.value;
        var speechOutput;
        var reprompt = speechOutput;

        if(guessNum === this.attributes["result"]) {
            this.attributes["score"] += 1;
            speechOutput = this.t("FEEDBACK_CORRECT");
        }
        else speechOutput = this.t("FEEDBACK_WRONG", guessNum, this.attributes["result"]);
      
        this.attributes["gamesPlayed"] += 1;
        this.emit('NewExercise',speechOutput,reprompt);
    },
    'AMAZON.StartOverIntent': function () {
        this.emit('StartOver');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = this.t("STOP_MESSAGE", this.attributes['score'], this.attributes['gamesPlayed']);
        var reprompt = speechOutput;
        this.emit(':tell', speechOutput, reprompt);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_REPROMPT");
        this.emit('NewExercise',speechOutput)
    },
    'Unhandled': function () {
        var speechOutput = this.t("UNHANDLED_MESSAGE");
        var reprompt = this.t("UNHANDLED_REPROMPT");
        this.emit(':ask', speechOutput, reprompt);
    }
};