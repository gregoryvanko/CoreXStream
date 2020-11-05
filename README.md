# CoreXStream
Streaming video server

## Usage
First, install the package using npm:
```bash
npm install @gregvanko/corexstream --save
```

## File App.js
Create a "App.js" file with this content:
```js
let CorexStream = require('./index').CoreXStream
let MyApp = new CorexStream()
MyApp.Start()
```