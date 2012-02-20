var http = require('http');
var connect = require('connect');
var hrshell = require('./hrshell');

connect.createServer().use(connect.router(function(app) {
	app.get('/:branch/:script', function(req, res, next) {
		hrshell.shell([[['bash ./deploy_relayer.sh', req.params.branch, req.params.script].join(' ')]], 		
		function(err, acum) {
			res.writeHead(200, {'content-type' : 'application/json'});
			res.end(JSON.stringify(acum));
		});
	});
})).listen(3000);
