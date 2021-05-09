# from base image node
FROM node:12-alpine  as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package.json .

#expose the port
EXPOSE 3000

RUN npm ci
COPY ./ .
CMD ["npm", "start"]
