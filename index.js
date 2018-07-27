// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');


// [START functions_pubsub_setup]
const PubSub = require('@google-cloud/pubsub');

// Instantiates a client
const pubsub = PubSub();
// [END functions_pubsub_setup]

const Buffer = require('safe-buffer').Buffer;
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
//exports.dialogflowFirebaseFulfillment = (req, res) => {
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  
/*  if (!req.body.topic) {
    res.status(500).send(new Error('Topic not provided. Make sure you have a "topic" property in your request'));
    return;
  } else if (!req.body.message) {
    res.status(500).send(new Error('Message not provided. Make sure you have a "message" property in your request'));
    return;
  }


  console.log(`Publishing message to topic ${req.body.topic}`);
  // References an existing topic

  const topic = pubsub.topic(req.body.topic);
*/
  const topic = pubsub.topic("test2-topic");
  const publisher = topic.publisher()

  var message = {
    data: {
 //     message: req.body.message
        message: req.body
    }
  };

//const data = JSON.stringify({ foo1: 'bar1' });
var data = JSON.stringify(message);

// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
var dataBuffer = Buffer.from(data);

  // Publishes a message
//  return topic.publish(message)
  publisher.publish(dataBuffer)
    .then(() => res.status(200).send('Message published.'))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
      return Promise.reject(err);
    });
});
