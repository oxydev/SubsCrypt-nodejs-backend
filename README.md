# SubsCrypt-nodejs-backend
<img src="https://oxydev.github.io/SubsCrypt-docs/images/logo2.png" width="500">

[![Test](https://github.com/oxydev/SubsCrypt-nodejs-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/oxydev/SubsCrypt-nodejs-backend/actions/workflows/node.js.yml)

# What is SubsCrypt-nodejs-backend?
We have provide an express-js API wrapper over the [SubsCrypt-npm-library](https://github.com/oxydev/SubsCrypt-npm-library/) To make development easier for developers who doesn't want to use the npm-pack or who doesn't uses js (polka-js has not official alternative in other languages like python).

# How to connect?
Currently there is no afficial running instance of this server. So if you want to use it, you should run your local instance. And also stay tunned for the updates and the official product.


First you have to ssh to our server which has a running [canvas node](https://github.com/paritytech/canvas-node) on it. However, if you don't have access to the server, please contact me to give you access:)
```
ssh -A root@{My-SERVER-IP} -L localhost:8000:localhost:8000 -L localhost:9615:localhost:9615 -L localhost:9944:localhost:9944
```

and then you should serve the server with this command:
```
npm run serve
```

# How to use api?
This servis is a RESTful API and you can see api documentation [here]()
