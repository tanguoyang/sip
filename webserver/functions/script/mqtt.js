const mqtt = require('mqtt');

// MQTT server configuration
const brokerUrl = 'wss://mf70eedc.ala.asia-southeast1.emqxsl.com:8084/mqtt';
const topic = 'devices/deviceId';

const clientId = 'emqx_nodejs_' + Math.random().toString(16).substring(2, 8)
const username = 'username'
const password = 'password'

const client = mqtt.connect(brokerUrl, {
    clientId,
    username,
    password,
    // ...other options
  })

// Handle connection event
client.on('connect', () => {
    console.log('Connected to MQTT server');

    // Publish a message to the topic
    client.publish(topic, 'press');
});

// Handle message event
client.on('message', (receivedTopic, message) => {
    console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`);
});

// Subscribe to the topic
client.subscribe(topic);