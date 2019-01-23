# Conekta integration node.js example

This example shows a simple integration with Conekta API 2.0.0 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites


You will need an actualized version of node and npm installed. 

In case you do not have the environment with node and npm, please refer to official documentation: 

```
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

```

You will also need Conekta API keys 

You can create a free account in minutes and use your sandbox API keys 

Create your account here: 

https://auth.conekta.com/sign_up 

### Set up this repo

A step by step series of examples that tell you how to get a development env running

Step 1. Clone the repo 

```
git clone https://github.com/conekta-examples/NodeExampleAPI2.git
```
Step 2. Install dependencies 


Run the following command

```
npm install

```

Step 3. Change your API keys

You need

Change your private Conekta API key

Go to app.js file and change your private API key

```
var conekta = require('conekta');
conekta.api_key = 'YOUR_PRIVATE_API_KEY';
conekta.api_version = '2.0.0';

```

Now go to views/newCard.ejs

In line 47

``` 

<script type="text/javascript">
   Conekta.setPublicKey('YOUR_PUBLIC_API_KEY');

```

Step 4. Run the project and create charges

Run the following command

```
node app.js
```

Follow the next URL and create a charge 

```
localhost:3005
```



Edit the flow and adapt it to your business model

Read comments in app.js to fulfill your workflow

Find one of this flows on the example

Preauthorizations
Monthly installments
Add time of expiration to Oxxo Pay or Spei payments 



Step 5. Deploy it in your live URL to receive Webhooks

## Deployment

Add additional notes about how to deploy this on a live system




## Authors

* **Santiago Campos** - *Jr Developer* - [San](https://github.com/santiagocamposenr)
* **Daniel Diner** - *Jr Developer* - [Dan](https://github.com/dinerdaniel)





## Acknowledgments

* Check out the complete documentation for Conekta API https://developers.conekta.com/ 

