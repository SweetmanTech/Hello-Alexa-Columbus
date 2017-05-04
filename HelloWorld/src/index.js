var Alexa = require('alexa-sdk');

        exports.handler = function(event, context, callback) {
            var alexa = Alexa.handler(event, context);

            // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

            alexa.registerHandlers(handlers);
            alexa.execute();
        };

        var handlers = {
            'LaunchRequest': function () {
                this.emit('MyIntent');
            },

            'AMAZON.HelpIntent': function () {
                this.emit(':ask', 'You can say hey to hear a welcome message. What would you like to do?');
            },

            'AMAZON.StopIntent': function () {
                var myName = '';
                if (this.attributes['name']) {
                    myName = this.attributes['name'];
                }
                this.emit(':tell', 'goodbye, ' + myName, 'try again');
            },

            'AMAZON.CancelIntent': function () {
                this.emit(':tell', 'cancelled');
            },

            'MyIntent': function () {
                this.emit(':tell', 'Patrick, the skill is working properly!');
            },

            'WhatsUpIntent': function () {
                this.emit(':ask', 'Second function is working');
            },

            'MyNameIsIntent': function () {
                var myName = this.event.request.intent.slots.firstname.value;
                this.attributes['name'] = myName;
                this.emit(':ask', 'hello, ' + myName, 'try again');
            },
        };
