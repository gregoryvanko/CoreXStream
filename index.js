class CoreXStream{
    constructor(Port = 4000, VideoFolder = "."){
        this._Port = Port
        this._VideoFolder = VideoFolder
        this._VideoStream = null
    }

    Start(){
        console.log("Application started")
        // Initiation de Video Stream
        let VideoStream = require('./VideoStream').VideoStream
        this._VideoStream = new VideoStream(this._VideoFolder)

        this._fs = require("fs");
        const express = require("express");
        const app = express();

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        });

        app.get('/video*', (req, res) => {
            this._VideoStream.Exectue(req, res)
        });

        app.listen(this._Port, () => {
            console.log(`Listening on port:${this._Port}`)
        });
    }
} 

 module.exports.CoreXStream = CoreXStream

 //https://dev.gregvanko.com/video/testsmall.mov?token=123XYZ