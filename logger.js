/**
 * Created by JetBrains WebStorm.
 * User: brox
 * Date: 7/02/12
 * Time: 13:25
 * To change this template use File | Settings | File Templates.
 */

//
// Simple substitute for a real logging
//

var http = require("http");
var config = require("./config_base").logger;

//TODO: use strings ??
var INFO = 10, ERROR = 1; 

var level = INFO;

var BUFFER_SIZE = config.BUFFER_SIZE;
var logBuffer = Array();
var iLogBuffer = 0;

function log(loglevel, msg, obj) {
	var now = new Date();
	
	if (level >= loglevel) {
        console.log(msg);
        if (obj) {
            console.dir(obj);
			logBuffer[iLogBuffer] = [now,  msg, obj];
			iLogBuffer = (iLogBuffer + 1) % BUFFER_SIZE;
		}
    }
}

function info(msg, obj) {
    log(INFO, msg, obj);
}

function error(msg, obj) {
    log(ERROR, msg, obj);
}


//TODO: return the array in JSON, let the presentation to the client
function logs_response(req, res) {

    var data;
    var str_data;
	var i;
	
    req.on('end', function () {
		str_data = JSON.stringify(logBuffer);
        res.writeHead(200, {'content-type' : 'application/json'});
        res.end(str_data);
    });
}

var server = http.createServer(logs_response);
server.listen(config.PORT);

exports.info = info;
exports.error = error;
