var StaticServer = require('static-server');
var serverStatic = new StaticServer({
    rootPath: './public',
    port: 8080,
    cors: '*',
});

serverStatic.start(function () {
    console.log('Server listening to', serverStatic.port);
});

console.log('Server running on port 8080');
