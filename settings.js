var os = require('os');
var fs = require('fs');
var path = require("path");
var logger = require('util');

// Hack nodejs API change
fs.exists = fs.exists || require('path').exists;
fs.existsSync = fs.existsSync || require('path').existsSync;

exports.create = function() {
  var settings = {};

  var defaults = {
    port: process.env.PORT || 8080,
    client: {
      transports: []
    },
    serviceInterval: 20000,
    serviceDelay: 3000,
    hostname: '0.0.0.0',
    services: [
    /**
     * Content Servers
     */
    {
      group: 'Content Servers',
      name: 'accounts.firefox.com',
      label: 'accounts.firefox.com',
      check: 'https',
      host: 'accounts.firefox.com',
      port: '443',
      path: '/'
    },
    {
      group: 'Content Servers',
      name: 'latest.dev.lcip.org',
      label: 'latest.dev.lcip.org',
      check: 'https',
      host: 'latest.dev.lcip.org',
      port: '443',
      path: '/'
    },
    {
      group: 'Content Servers',
      name: 'stable.dev.lcip.org',
      label: 'stable.dev.lcip.org',
      check: 'https',
      host: 'stable.dev.lcip.org',
      port: '443',
      path: '/'
    },
    {
      group: 'Content Servers',
      name: 'nightly.dev.lcip.org',
      label: 'nightly.dev.lcip.org',
      check: 'https',
      host: 'nightly.dev.lcip.org',
      port: '443',
      path: '/'
    },
    /**
     * Loop
     */
    {
      group: 'Loop',
      label: 'loop.services.mozilla.com',
      check: 'https',
      host: 'loop.services.mozilla.com',
      port: '443',
      path: '/'
    },
    {
      group: 'Loop',
      name: 'loop.dev.lcip.org',
      label: 'loop.dev.lcip.org',
      check: 'http',
      host: 'loop.dev.lcip.org',
      port: '80',
      path: '/'
    },
    /**
     * Other Services
     */
    {
      name: 'restmail.net',
      label: 'restmail.net',
      check: 'tcp',
      host: 'www.restmail.net',
      port: '80',
      path: '/mail/v1'
    },
    {
      label: 'qa.stage.mozaws.net',
      check: 'tcp',
      host: 'qa.stage.mozaws.net',
      port: '8080',
      path: '/'
    },
    {
      name: 'freight.dev.lcip.org',
      label: 'freight.dev.lcip.org',
      check: 'https',
      host: 'freight.dev.lcip.org',
      port: '443',
      path: '/static/img/logo.png'
    },
    {
      name: 'npm',
      label: 'npm',
      check: 'https',
      host: 'www.npmjs.org',
      port: '443',
      path: '/'
    }
    ],
    plugins : {
      external: {
        enable: false,
        file: __dirname + '/plugins.json'
      }
    }
  };

  var mySettings = defaults;
  // logger.log("Dumping defaults:\r\n" + JSON.stringify(mySettings));

  if (process.env.APP_ENV) {
    logger.log("Loading settings: " + process.env.APP_ENV);
    mySettings = merge(mySettings, settings[process.env.APP_ENV]);
  }

  // logger.log("Dumping after APP_ENV:\r\n" + JSON.stringify(mySettings));

  if (process.env.APP_SETTINGS) {
    logger.log("Loading appSettings: " + process.env.APP_SETTINGS);
    if (fs.existsSync(process.env.APP_SETTINGS)) {
      appSettings = require(process.env.APP_SETTINGS).create();
      mySettings = merge(mySettings, appSettings);
    } else {
      logger.log("WARN: " + process.env.APP_SETTINGS + " does not exist or not a file.");
    }
  }

  // logger.log("Dumping after APP_SETTINGS:\r\n" + JSON.stringify(mySettings));
  return mySettings;
};

function merge(obj1, obj2) {
  for (var p in obj2) {
    try {
      if (typeof(obj2[p]) == 'object') {
        if (obj2[p].constructor == Array) {
          if (obj2[p].length != 0) {
            for (var j in obj2[p]) {
              if (obj1[p].length == 0) {
                obj1[p][0] = obj2[p][j];
              } else {
                var found = false;
                for (var i in obj1[p]) {
                  if (obj1[p][i].name == obj2[p][j].name) {
                    obj1[p][i] = merge(obj1[p][i], obj2[p][j]);
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  obj1[p][obj1[p].length] = obj2[p][j];
                }
              }
            }
          }
        } else {
          obj1[p] = merge(obj1[p], obj2[p]);
        }
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // logger.log(e);
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}

