class CoreXStream{
    constructor(Port = 4000, VideoFolder = "."){
        this._Port = Port
        this._VideoFolder = VideoFolder
    }

    Start(){
        console.log("Application started")
        const express = require("express");
        const app = express();

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        });

        app.get('/video', (req, res) => {
            this.VideoStream(this._VideoFolder, "name", req, res)
        });

        app.listen(this._Port, () => {
            console.log(`Listening on port:${this._Port}`)
        });
    }

    VideoStream(VideoFolder, TagName, req, res ){
        const fs = require("fs");
        const filePath = VideoFolder + "/" + req.query[TagName]

        if(fs.existsSync(filePath)){
            const options = {};
            let start;
            let end;
    
            const range = req.headers.range;
            if (range) {
                const bytesPrefix = "bytes=";
                if (range.startsWith(bytesPrefix)) {
                    const bytesRange = range.substring(bytesPrefix.length);
                    const parts = bytesRange.split("-");
                    if (parts.length === 2) {
                        const rangeStart = parts[0] && parts[0].trim();
                        if (rangeStart && rangeStart.length > 0) {
                            options.start = start = parseInt(rangeStart);
                        }
                        const rangeEnd = parts[1] && parts[1].trim();
                        if (rangeEnd && rangeEnd.length > 0) {
                            options.end = end = parseInt(rangeEnd);
                        }
                    }
                }
            }
        
            res.setHeader("content-type", "video/mp4");
        
            fs.stat(filePath, (err, stat) => {
                if (err) {
                    console.error(`File stat error for ${filePath}.`);
                    console.error(err);
                    res.sendStatus(500);
                    return;
                }
        
                let contentLength = stat.size;
        
                // Listing 4.
                if (req.method === "HEAD") {
                    res.statusCode = 200;
                    res.setHeader("accept-ranges", "bytes");
                    res.setHeader("content-length", contentLength);
                    res.end();
                }else {       
                    // Listing 5.
                    let retrievedLength;
                    if (start !== undefined && end !== undefined) {
                        retrievedLength = (end+1) - start;
                    }else if (start !== undefined) {
                        retrievedLength = contentLength - start;
                    }else if (end !== undefined) {
                        retrievedLength = (end+1);
                    }else {
                        retrievedLength = contentLength;
                    }
        
                    // Listing 6.
                    res.statusCode = start !== undefined || end !== undefined ? 206 : 200;
        
                    res.setHeader("content-length", retrievedLength);
        
                    if (range !== undefined) {  
                        res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                        res.setHeader("accept-ranges", "bytes");
                    }
        
                    // Listing 7.
                    const fileStream = fs.createReadStream(filePath, options);
                    fileStream.on("error", error => {
                        console.log(`Error reading file ${filePath}.`);
                        console.log(error);
                        res.sendStatus(500);
                    });
        
        
                    fileStream.pipe(res);
                }
            });
            
        }else {
            res.status(404).send(`File not foud: ${filePath}`)
        }
    }
} 

 module.exports.CoreXStream = CoreXStream

 //https://dev.gregvanko.com/video?name=test.mov