var http = require('http');
var logger = require('./logger.js');

stats = {};


function set(key, value) {
    stats[key] = value;
}

function inc(key, value) {
    stats[key] += value;
}

function del(key) {
    del
    stats[key];
}

function get(key) {
    return stats[key];
}

function get_all() {
    return stats;
}


function stats_response(req, res) {

    var data;
    var str_data;

    req.on('end', function () {
        if(req.url == "/all") {
            data = stats;
        } else {
            data = stats[req.url];
        }
        str_data = JSON.stringify(data);
        res.writeHead(200);
        res.end(""+str_data);
    });
}

var server = http.createServer(stats_response);
server.listen(3080);

exports.set = set;
exports.inc = inc;
exports.del = del;
