const amqp = require('amqplib');
const { addDelivery } = require('../controllers/userController');

let channel, connection; // Declare variables for AMQP connection and channel

exports.connect = async () => {
    const amqpServer = "amqp://guest:guest@rabbitmq:5672"; // RabbitMQ server URL

    try {
        connection = await amqp.connect(amqpServer); // Create connection
        channel = await connection.createChannel(); // Create channel
        await channel.assertQueue("USER"); // Initialize USER Queue
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
    
    channel.consume("USER", data => {
        try {
            const { userId, userDelivery } = JSON.parse(data.content.toString()); // Reconstruct data from the buffer
            console.log(userId, userDelivery);
            channel.ack(data); // Send acknowledgment to the AMQP server that the data is received
            addDelivery(userId, userDelivery); // Send the data to the addDelivery function
        } catch (error) {
            console.error("Error consuming message from queue:", error);
            // Handle the error as needed
        }
    });
}

exports.getChannel = () => {
    return channel;
};
