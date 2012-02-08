var fs = require('fs')
  , colors = require('colors')
  , pkg = JSON.parse(fs.readFileSync('./package.json'));

function exec(command, callback) {
  console.log(('Executing: ' + command + '\n').cyan);
  require('child_process').exec(command, callback);
}

function execOutput(error, stout, sterr) {
  if (sterr) {
    console.error(sterr.red);
  }
  if (stout) {
    console.log(stout.grey);
  }
}

console.log('\ndeploy-npm publishing version '.green + pkg.version + ' of '.green + pkg.name + '\n');

exec('git tag ' + pkg.version, execOutput);
exec('git push --tags', execOutput);
exec('npm publish', execOutput);