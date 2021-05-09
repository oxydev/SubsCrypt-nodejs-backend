# from base image node
FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY . .

#expose the port
EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
