# E-learning Microservices Project (Distributed Systems Project for Year 3 Semester 2)

## Group Members

+ IT21250156 - Withanagamage J.C
+ IT21277122 - Degaldoruwa D.W.S.S.W.M.R.M.B.B
+ IT21303302 - Weerakoon W.M.B.B

## Technologies Used

+ Frontend - [Vite.js](https://vitejs.dev/)
+ Backend - [Express.js](https://expressjs.com/), [Node.js](https://nodejs.org/)
+ Database - MongoDB
+ Containerization - Docker
+ Message Broker - RabbitMQ
+ End Point Testing - Postman

## About Coursemate

Coursemate is an e-learning platform designed to facilitate instructors and learners in the management and consumption of educational courses. Employing microservices architecture, the platform offers various services tailored to specific functionalities.

There are 5 backend microservices:

+ Authentication Service - This service provides authentication for instructors, learners, and admin. It also includes APIs for user registration and login.
+ Cart Service - This service enables learners to manage their shopping cart by adding and removing courses.
+ Payment Service - Facilitates learners in making payments using credit cards or payment integration services.
+ Course Management Service - Allows instructors to manage courses by providing APIs for adding and updating courses. Admins can also delete courses and update course status.
+ Gateway Service - Separates external public APIs from internal microservice APIs, allowing for flexibility in adding microservices and adjusting boundaries.

### GitHub Repository

[Coursemate GitHub Repository](https://github.com/it21303302b/E-learning-microservice-)

### Project Description

Coursemate is an innovative e-learning platform aimed at revolutionizing the way instructors and learners interact with educational content. With its microservices architecture, Coursemate offers unparalleled flexibility and scalability, ensuring seamless performance even under heavy loads.

Instructors can effortlessly create and manage courses using the Course Management Service, while learners can explore a wide range of courses and add them to their carts with the Cart Service. The Authentication Service ensures secure access for all users, while the Payment Service simplifies the process of making transactions.

One of Coursemate's standout features is its Gateway Service, which acts as a centralized entry point for all external and internal APIs. This allows for easy integration of new microservices and dynamic adjustment of service boundaries, making Coursemate adaptable to evolving requirements.

Whether you're an instructor looking to share your expertise or a learner eager to expand your knowledge, Coursemate provides a user-friendly and efficient platform for all your e-learning needs.

### Build

Refer to the following instructions for building all the apps and packages:

[Build Instructions for Backend Microservices](/backend/readme.md)

![Coursemate](https://github.com/it21303302b/E-learning-microservice-/assets/coursemate_screenshot.jpg)
 