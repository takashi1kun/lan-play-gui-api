import express from "express";
import path from "path";
import portscanner from "portscanner";
import fs from "fs";
import sanitize from "sanitize-filename";
const app = express();
const port = 80; // default port to listen

// Configure Express to use EJS



// start the express server
app.listen( port, () => {
} );


app.get( "/api/ip", ( req, res, next ) => {
    const ip = (<string>req.headers['x-forwarded-for'] || <string>req.connection.remoteAddress || '').split(',')[0].trim()
    res.json( {ip:ip} );
} );
app.get( "/api/json/:jsonName", async ( req, res, next ) => {
    const jsonName: string = sanitize(req.params.jsonName);
    const pathJson = path.join(__dirname,`/json/${jsonName}.json`);
    if (fs.existsSync(pathJson)) {
        const jsonData = require(pathJson);
        res.json( jsonData );
    } else{
        res.sendStatus(404);
    }
    
} );
app.get( "/api/port/:port", async ( req, res, next ) => {
    const port: number = parseInt(req.params.port);
    const ip = (<string>req.headers['x-forwarded-for'] || <string>req.connection.remoteAddress || '').split(',')[0].trim();
    const scan = portscanner.checkPortStatus(port, ip);
    const result = await scan;
    res.json( {scan:result} );
} );