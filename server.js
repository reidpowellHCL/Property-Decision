const fs = require('fs');
const path = require('path');
const http = require('http');
//const https = require('https');
const express = require('express');
// const privateKey  = fs.readFileSync('/certs/cert.key', 'utf8');
// const certificate = fs.readFileSync('/certs/cert.cer', 'utf8');
// const options = {key: privateKey, cert: certificate, minVersion: 'TLSv1.2'};
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/build/index.html'));
});
// const httpServer = http.createServer(app);
const httpServer = http.createServer(app);
// httpServer.listen(3001);
httpServer.listen(443);

console.log("The server is running!");
