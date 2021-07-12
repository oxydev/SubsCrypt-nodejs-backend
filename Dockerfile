# from base image node
FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN --mount=target=/usr/src/app/uploads/uploadProviders,type=bind,source=uploads/uploadProviders

# copying all the files from your file system to container file system
COPY . .

#expose the port
EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
