let CorexStream = require('./index').CoreXStream
const Port = 5000
const VideoFolder = "./Videos"
let MyApp = new CorexStream(Port, VideoFolder)
MyApp.Start()