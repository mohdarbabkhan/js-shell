const { exec } = require('child_process');
var path = require('path')

var currentDir = "/home";
process.chdir(currentDir)

process.on("message", function(message){


if (message.cmd == "chDir"){
  currentDir = path.resolve(message.path);
  process.chdir(currentDir)
  // process.send({out: "Currect working dir changed", cwd: currentDir})
}

else if (message.cmd != undefined){

var child = exec(message.cmd,

(error, stdout, stderr) => {

  process.send({out: stdout.toString(), err: stderr.toString(), cwd: currentDir});

});

process.send({pid: child.pid})

if(message == "kill"){
  process.send({out: "Process Terminated by Ctrl + C", err: '', cwd: currentDir})
  child.exit();
}


}

})