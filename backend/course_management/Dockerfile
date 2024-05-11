FROM node:alpine
WORKDIR /backend/course_management/src
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start"]