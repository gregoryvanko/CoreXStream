let CorexStream = require('./index').CoreXStream
const Port = 5000
let MyApp = new CorexStream(Port)
MyApp.Start()