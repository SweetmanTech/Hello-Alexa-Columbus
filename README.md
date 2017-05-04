#### SweetTech - Hello Alexa Columbus - Hello World
## Hello World <a id="title"></a>
<hr />

### Intro <a id="intro"></a>


### This is a simple tutorial to introduce a simple Alexa skill and code.

### Tutorial Steps
#### Code
1. Login to AWS and verify the region at the top right is set to the **Ireland** or **N. Virginia** Region region.
1. Click [Lambda](https://console.aws.amazon.com/lambda/home) and then **Create a Lambda function**  Do not select the default **Blank** blueprint.
1. Locate and click on the ```alexa-skill-kit-sdk-factskill``` skill template (hint: search for **fact** )
1. Click in the empty square and choose the trigger *Alexa Skills Kit* and click Next.
1. Give your function the name *HelloWorld*
1. Paste in the source code from [src/index.js](./src/index.js) :

```
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


```

1. Just below the code editor, create or re-use an execution role, such as ```lambda_basic_execution```
1. Click Next and create the function.
1. Make note of the Lambda ARN, shown near the top right, such as
 *  ``` arn:aws:lambda:us-east-1:892613034###:function:HelloAlexa-HelloWorld ```


#### Skill
1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit
1. Create a new Skill called HelloWorld with invocation name ```hello world```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
  "intents": [
    {
      "intent": "MyIntent"
    },
    {
      "intent": "WhatsUpIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "MyNameIsIntent",
      "slots": [
        {
          "name": "firstname",
          "type": "AMAZON.DE_FIRST_NAME"
        }
      ]
    }
  ]
}


```

1. Paste in the [SampleUtterances.txt](speechAssets/SampleUtterances.txt) :

```
MyIntent hello
WhatsUpIntent total
MyNameIsIntent my name is {firstname}
```

1. Configure the skill endpoint with the AWS Lambda ARN previously created.
