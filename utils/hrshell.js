var exec = require('child_process').exec;
/* Example:
  
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

 */

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
		next && next(error, acum);
	});
}

exports.shell = shell;

