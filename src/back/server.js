var restify = require('restify');
const fs = require('fs');
const BASE_DIR = __dirname + '/../../public/upload';

function listDir(req, res, next) {
    var dir = req.params.dir;

    res.write('list ' + dir);

    fs.readdir(BASE_DIR + dir, function(err, items) {
        for (var i=0; i<items.length; i++) {
            res.write(items[i]);
        }
        res.end();

    });

    return next();
}

function createDir(req, res, next) {
    var dir = req.params.dir;

    res.write('create ' + BASE_DIR + '/' + dir);
    fs.mkdirSync(BASE_DIR + '/' + dir, { recursive: true }, (err) => {
        if (err) throw err;
    });
    res.end();
    next();
}

function delDir(req, res, next) {
    var dir = req.params.dir;
    if( fs.existsSync(BASE_DIR + '/' + dir) ) {
        try{
            fs.rmdirSync(BASE_DIR + '/' + dir);
        }
        catch(err){
            res.write('del ' + err);
        }

        res.write('del ' + BASE_DIR + '/' + dir);
    }
    res.end();
    next();
}

var corsMiddleware= require("restify-cors-middleware");
const cors = corsMiddleware({
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});

var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);


server.get('/dir/:dir', listDir);
server.post('/dir/:dir', createDir);
server.del('/dir/:dir', delDir);

server.listen(8081, function() {
    console.log('%s listening at %s', server.name, server.url);
});
