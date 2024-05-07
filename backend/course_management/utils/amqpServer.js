const amqp = require('amqplib');
const { createCourse } = require('../controllers/courseController');

let channel, connection;

exports.connect = async () => {
    const amqpServer = "amqp://guest:guest@rabbitmq:5672";

    try {
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("COURSES");
        console.log("AMQP server running on:", amqpServer);
    } catch (error) {
        console.error("Error connecting to AMQP server:", error);
    }
};

exports.getChannel = () => {
    return channel;
};

exports.consumefromQueue = () => {
    if (!channel) {
        console.error("Channel is not initialized. Connection to RabbitMQ might not be established.");
        return;
    }
    
    channel.consume("COURSES", data => {
        try {
            const courseData = JSON.parse(data.content.toString());
            console.log("Received message from queue - Course Data:", courseData);
            channel.ack(data);
            createCourse(courseData); // Assuming courseData contains all required course information
        } catch (error) {
            console.error("Error consuming message from queue:", error);
        }
    });
};
