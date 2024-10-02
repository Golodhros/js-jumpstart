// Ref:
// https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/
//
// Here’s a sample script that prompts for private settings and creates a
// GitHub repo if you want. Make sure you change the default
// GitHub username (YOUR_GITHUB_USERNAME) as the fallback for the GitHub username environment variable.
//
// @example
// npm config set init-module ~/.npm-init.js


var cp = require('child_process');
var priv;

var USER = process.env.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME';

module.exports = {

  name: prompt('name', basename || package.name),

  version: '0.0.1',

  private: prompt('private', 'true', function(val){
    return priv = (typeof val === 'boolean') ? val : !!val.match('true')
  }),

  create: prompt('create github repo', 'yes', function(val){
    val = val.indexOf('y') !== -1 ? true : false;

    if(val){
      console.log('enter github password:');
      cp.execSync("curl -u '"+USER+"' https://api.github.com/user/repos -d " +
        "'{\"name\": \""+basename+"\", \"private\": "+ ((priv) ? 'true' : 'false')  +"}' ");
      cp.execSync('git remote add origin '+ 'https://github.com/'+USER+'/' + basename + '.git');
    }

    return undefined;
  }),

  main: prompt('entry point', 'index.js'),

  repository: {
    type: 'git',
    url: 'git://github.com/'+USER+'/' + basename + '.git' },

  bugs: { url: 'https://github.com/'+USER'/' + basename + '/issues' },

  homepage: "https://github.com/"+USER+"/" + basename,

  keywords: prompt(function (s) { return s.split(/\s+/) }),

  license: 'MIT',

  cleanup: function(cb){

    cb(null, undefined)
  }

}