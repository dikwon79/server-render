const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const fs = require('fs');
const { getResponseMessage, messages } = require('./lang/messages/en/en');
const FileHandler = require('./modules/fileHandler'); // FileHandler 



class MyHTTPServer {
    constructor() {
        this.filePath = './lang/messages/en/en.json';
        this.filePath2 = './file.txt';
        this.port = process.env.PORT || 8001;
        this.server = http.createServer(this.handleRequest.bind(this));
        this.fileHandler = new FileHandler(this.filePath);
        this.fileHandler2 = new FileHandler(this.filePath2);
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`${messages.success.server} ${this.port}`);
        });
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const name = parsedUrl.query.name || 'secret boy';
        const currentDateTime = utils.getDate();
        const formattedResponse = getResponseMessage(name, currentDateTime);

        console.log(parsedUrl.pathname);
        //여기까지
        if (parsedUrl.pathname === '/COMP4537/labs/3/getDate/') {
            this.fileHandler.writeToFile(JSON.stringify(formattedResponse, null, 2), (err) => {
                if (err) {
                    console.error(messages.error.write, err);
                    return;
                }
                console.log(messages.success.jasonsuccess);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(formattedResponse);
            });

        } else if (parsedUrl.pathname === '/COMP4537/labs/3/writeFile/') {
            const text = parsedUrl.query.text;
            this.fileHandler2.appendToFile(`${text}\n`, (err) => {
                if (err) {
                    console.error(messages.error.append, err);
                    return;
                }
                console.log(messages.success.appendsuccess, text);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(messages.success.appendsuccess);
            });
        } else if (parsedUrl.pathname.startsWith('/COMP4537/labs/3/readFile/')) {
            const fileName = parsedUrl.pathname.substring('/COMP4537/labs/3/readFile/'.length);

            console.log(fileName);
            const fileToRead = `./${fileName}`;

            console.log(fileToRead);
            const fileHandler = new FileHandler(fileToRead);
            fileHandler.readFile((err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end(messages.error.file);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(messages.error[404]);
        }
    }
}

// 서버 시작
const myServer = new MyHTTPServer();
myServer.start();