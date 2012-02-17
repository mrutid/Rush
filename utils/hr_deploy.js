var util = require('util'),
	exec = require('child_process').exec;
	spawn = require('child_process').spawn;

/*
function rm(next,acum) {
	command( next, acum, 'rm', ['-rf', 'Unstable']);	
}	
function wget(next, acum) {
	command( next, acum, 'wget', ['--no-check-certificate', 'https://github.com/mrutid/Rush/zipball/Unstable']);
}
function unzip(next, acum) {
	command( next, acum, 'unzip', ['-u', 'Unstable']);
}
*/
/*
 async.waterfall(
	[ 
		function(callback) {command('rm', ['-r', 'UnstableX'],null, {}, callback); },
		function(acum, callback) {command('wget', ['--no-check-certificate', 'xhttps://github.com/mrutid/Rush/zipball/Unstable'],null, acum,callback);},
		function(acum, callback) {command('unzip', ['-u', 'Unstable'], null, acum, callback);}
	
	], function(err, result) {
		console.dir(err);
		console.dir(result);
	}
);


 */


shell(
	[
		['rm -f Unstable'],
		['rm -rf BRANCH'],
		['mkdir BRANCH'],
		['wget --no-check-certificate https://github.com/mrutid/Rush/zipball/Unstable'],
		['unzip -d BRANCH -u Unstable'],
		['ls BRANCH'],
	],
	function(err,acum) {
		console.dir(err);
		console.dir(acum);
		console.log("______________");
		console.log(acum['ls BRANCH'][1]);
		console.log("______________");
	}
);

function shell(cmd_list, next, acum) {
	
	acum = acum || {};

	if(cmd_list.length == 0) {
		next && next(false,acum);
	}
	else {
		cmd0 = cmd_list.shift();
		command(function(err,acum) {
			err ? (next && next(err,acum)) : shell(cmd_list, next, acum);
		}, acum, cmd0[0], cmd0[1]);		
	}
}

function command(next, acum, command, options) {
	var cmd;

	cmd = exec(command, function(error, stdout, stderr) {
		acum[command] = [error, stdout, stderr];
		//code serves as error
		next && next(error, acum);
	});
}


