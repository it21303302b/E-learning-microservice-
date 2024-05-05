const amqp = require('amqplib');
const { addReview } = require('../controllers/itemscontroller');

let channel, connection;

exports.connect = async () => {
    const amqpServer = "amqp://guest:guest@rabbitmq:5672";

    try {
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("ITEMS");
        console.log("AMQP server running on:", amqpServer);
    } catch (error) {
        console.error("Error connecting to AMQP server:", error);
    }
}

exports.getChannel = () => {
    return channel;
};

exports.consumefromQueue = () => {
    if (!channel) {
        console.error("Channel is not initialized. Connection to RabbitMQ might not be established.");
        return;
    }
    
    channel.consume("ITEMS", data => {
        try {
            const { productID, itemReview } = JSON.parse(data.content.toString());
            console.log("Received message from queue - Product ID:", productID, "Item Review:", itemReview);
            channel.ack(data);
            addReview(productID, itemReview);
        } catch (error) {
            console.error("Error consuming message from queue:", error);
            // Handle the error as needed
        }
    });
}
