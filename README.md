# NodeApi

1. First, create package.json file.
```
npm init
```

2. Packages install.
```
npm i morgan --save
npm i mongoose --save
npm i jsonwebtoken --save
npm i express --save
npm i body-parser i --save
```
As a result package.json file
```
{
  "name": "NodeApi",
  "version": "0.0.0",
  "description": "",
  "main": "server.json",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/serkomut/NodeApi.git"
  },
  "author": "",
  "license": "BSD-2-Clause",
  "bugs": {
    "url": "https://github.com/serkomut/NodeApi/issues"
  },
  "dependencies": {
    "morgan": "~1.5.3",
    "mongoose": "~4.0.4",
    "jsonwebtoken": "~5.0.1",
    "express": "~4.12.4",
    "body-parser": "~1.12.4"
  }
}
```