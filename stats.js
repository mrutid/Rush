var http = require('http');
var config = require('./config_base.js').stats;

stats = {};


function set(key, value) {
	var d = new Date();
    stats[key] = [value, d];
}

function inc(key, value) {
	var d = new Date();
	stats[key][0] += value;
	stats[key][1] = d;
}

function del(key) {
    delete stats[key];
}

function get(key) {
    return stats[key];
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
server.listen(config.PORT);

exports.set = set;
exports.inc = inc;
exports.del = del;
