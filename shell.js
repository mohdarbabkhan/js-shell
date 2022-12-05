var child_process = require('child_process');
const readline = require("readline")
// const process = require('process');
var path = require('path')

var _interface = readline.createInterface({
  input: process.stdin,
  output : process.stdout,
  prompt : ''
});

var currentPID = 0;
var numberofProcess = 0;

_interface.on('line', function(line) {

  switch(line.substring(0, line.indexOf(' '))) {
    case "cd":
      var dir = line.substring(line.indexOf(' ') + 1)
      try {
      process.chdir(path.resolve(dir))
      child.send({cmd : "chDir", path: dir});
      console.log("\x1b[47m", "JShell :"+process.cwd()+">" , '\x1b[0m')
      }
      catch(err){
        console.error("no such file or directory: "+dir);
      }

      break;
    case "exit":
      child.send("kill");
      // process.exit();
    default:
      child.send({cmd : line, path: dir});
      break;
  }
});

_interface.on('SIGINT', function() {
  console.log('Received SIGINT. Press Control+D to exit.');
  if (numberofProcess != 0){
  child.send("kill");
}
});


process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

process.openStdin().on("keypress", function(chunk, key) {
  if(key && key.name === "d" && key.ctrl) {
    console.log("bye bye");
    process.exit();
  }
});

var child = child_process.fork("child.js");
numberofProcess = 1;
child.on("message", function(message){
  if (message.pid != undefined){
    currentPID = message.pid
  }
  else{
  console.log("\x1b[32m", message.out, '\x1b[0m');
  console.log(message.err);
  console.log("\x1b[47m", "JShell :"+process.cwd()+">" , '\x1b[0m')
  }
});

child.on("exit", function(exit){
  numberofProcess = 0;
})


console.log(`
JShell
Bla bla bla. no rights reserved.


`)

process.chdir("/home")
console.log("\x1b[47m", "JShell :"+process.cwd()+">" , '\x1b[0m')