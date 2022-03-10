FROM node:12.19.0-alpine3.9

# Create a directory where our app will be placed
# -p will create all the directories necessaries to fulfill your request, not returning any error in case that directory exists.
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

RUN npm i -g @nestjs/cli

RUN npm install glob rimraf

COPY package*.json .

RUN npm install

COPY . .