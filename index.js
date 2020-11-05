class CoreXStream {
    constructor(Port = 4000){
        this._Port = Port
        const express = require('express')
        this._app = express()
    }
 
    /* Start de l'application */
    Start(){
       console.log("Application started")
       this._app.get('/', (req, res) => {
           res.send('Hello World!')
        })
        
        this._app.listen(this._Port, () => {
            console.log(`App listening at ${this._Port }`)
        })
    }
 }
 module.exports.CoreXStream = CoreXStream