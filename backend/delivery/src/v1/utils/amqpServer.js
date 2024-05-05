const amqp = require('amqplib');
const { updateDelivery } = require('../controller/delivery-amqpServices');

let channel, connection; // Declare variables for AMQP connection and channel

exports.connect = async () => {
    const amqpServer = "amqp://guest:guest@rabbitmq:5672"; // AMQP server URL

    try {
        connection = await amqp.connect(amqpServer); // Create connection
        channel = await connection.createChannel(); // Create channel
        await channel.assertQueue("DELIVERY"); // Initialize DELIVERY Queue
        console.log("AMQP server running on:", amqpServer);
    } catch (error) {
        console.error("Error connecting to AMQP server:", error);
    }
}

exports.consumefromQueue = () => {
    if (!channel) {
        console.error("Channel is not initialized. Connection to RabbitMQ might not be established.");
        return;
    }
    
    channel.consume("DELIVERY", data => {
        try {
            const { deliveryId, deliveryStatus } = JSON.parse(data.content.toString()); // Reconstruct data from the buffer
            console.log(deliveryId, deliveryStatus);
            channel.ack(data); // Send acknowledgment to the AMQP server that the data is received
            updateDelivery(deliveryId, deliveryStatus); // Send the data to the update delivery function
        } catch (error) {
            console.error("Error consuming message from queue:", error);
            // Handle the error as needed
        }
    });
}

exports.sendMessage = async (queueName, data) => {
    if (!channel) {
        console.error("Channel is not initialized. Connection to RabbitMQ might not be established.");
        return;
    }

    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data))); // Create a buffer and send data to the queue
    console.log(`Message sent to queue ${queueName}`);
}
