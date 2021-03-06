FXA Details
======

[![wercker status](https://app.wercker.com/status/01c7b12886ec39c2151c9aaefaadaef0/m "wercker status")](https://app.wercker.com/project/bykey/01c7b12886ec39c2151c9aaefaadaef0)

Status Dashboard
=======

Status Dashboard is status page for your configured services or applications.

Demo @ [Heroku](http://heroku.com) : [http://statusdashboard-node.herokuapp.com](http://statusdashboard-node.herokuapp.com)

Installation
============

* npm install statusdashboard
or
* npm install git+https://github.com/iobazoud/statusdashboard#master

Optionally, you can install as a global package

How To Use
=======

### As an application

Add your entry in settings.js.

<pre class="json">
settings['xxx'] = {
...
};
</pre>

* export APP_ENV=demo
* ./bin/statusdashboard

You can override settings with an external settings for private information like passwords, ..

* vi ~/.statusdashboard/settings.js
<pre class="json">
exports.create = function() {
  var appSettings = {
    port: 8081,
    services: [{
      name: 'FTP Local',
      password: 'xxx'
    }]
  };
  return appSettings;
};
}</pre>

* export APP_SETTINGS=~/.statusdashboard/settings.js

### As a node module

```
var dashboard = require('statusdashboard').dashboard(settings);
```

#### Code

##### dashboard.api.addService(serviceObject)

Add a new service to be checked

##### dashboard.api.removeService(ServiceName)

Remove a service to be checked

##### dashboard.api.startChecking

Start the scheduled checks. Automatically is started by default when instanciating dashboard

##### dashboard.api.stopChecking

Stop the scheduled checks

##### dashboard.api.getStatus()

Return the current status of checked services

**All other calls available in api.js are to be used at your own risk. You have been warned**

Service
=======

Daemon init script for node.js: [https://gist.github.com/1123553](https://gist.github.com/1123553)

Plugins
=======

Some plugins are available out-of-the-box:

* Console
* Graphite, send service state in [Graphite](http://graphite.wikidot.com/)
* Heartbeat
* History, save service state in <a href="http://redis.io">Redis</a> (Thanks to <a href="https://github.com/sreeix">sreeix</a> initial pull request) and graph it!
* IRC bot
* Mail
* Twitter
* Webhook
* XMPP

<img src="http://blog.bazoud.com/images/ssd7a.png" alt="">

<img src="http://blog.bazoud.com/images/ssd8a.png" alt="">

External Plugins
================

You can develop independent plugins and load them into Status Dashboard by using the external plugin feature. A plugin example is available at [http://github.com/chamerling/sd-plugin-sample](http://github.com/chamerling/sd-plugin-sample).

Plugins can be installed using npm CLI (from the status-dashboard directory):

    npm install sd-plugin-sample

Or by adding them as dependency in the status-dashboard package.json descriptor.

In order to activate plugins, you have to add them to the plugins.json file (\["sd-plugin-sample"\], \["my_plugin"\]) and turn on the external plugins feature in settings.js:

    plugins : {
      external: {
        enable : true,
        file : __dirname + '/plugins.json'
      },
      ...
    }

REST API
=======

* List services
<pre class="terminal">
$ curl http://127.0.0.1:8080/api/services
{"last":"Fri, 17 Jun 2011 22:33:03 GMT","services":[{"name":"couchdb","label":"Couchdb server @ local","status":"up","statusCode":200,"message":""},{"name":"bazoud.free.fr","label":"Olivier Bazoud blog","status":"up","statusCode":200,"message":""},{"name":"bazoud.free.fr","label":"Olivier Bazoud blog test.php","status":"up","statusCode":200,"message":""},{"name":"redis","label":"Redis server @ local","status":"up","statusCode":0,"message":""},{"name":"FTP Local","label":"Ftp @ local","status":"down","statusCode":0,"message":"ECONNREFUSED, Connection refused"},{"name":"PID file","label":"Pid @ local","status":"unknown","statusCode":9,"message":"EBADF, Bad file descriptor '/tmp/terminal.pid'"}],"lastupdate":"Fri, 17 Jun 2011 22:33:08 GMT","summarize":{"lastupdate":"Fri, 17 Jun 2011 22:33:08 GMT","up":3,"critical":0,"down":1,"unknown":2}}
</pre>

* Retrieve a specific service
<pre class="terminal">
$ curl http://127.0.0.1:8080/api/services/couchdb
{"name":"couchdb","label":"Couchdb server @ local","status":"up","statusCode":200,"message":""}
</pre>

* Retrieve a summary
<pre class="terminal">
$ curl http://127.0.0.1:8080/api/summarize
{"up":4,"critical":0,"down":1,"unknown":1}
</pre>

* Version of application
<pre class="terminal">
$ curl -iX GET http://127.0.0.1:8080/api/version
{"commit":"641b97cbcfdc53b1b2b825d588afe08e412471d4","author":"obazoud","committer":"obazoud","date":"Fri, 12 Aug 2011 10:15:27 GMT"}
</pre>

* And plugin can contribute to statusdashboard REST API
<pre class="terminal">
$ curl http://127.0.0.1:8080/api/history/service/couchdb
["{\"time\":1310024374699,\"status\":\"up\",\"message\":\"\",\"code\":200}","{\"time\":1310024379591,\"status\":\"up\",\"message\":\"\",\"code\":200}", ...]
</pre>



Early adopters
=======

* [Exoplatform](http://status.exoplatform.org)

<img src="http://blog.bazoud.com/images/ssd4.png" alt="status.exoplatform.org">

* [Shufflr](https://twitter.com/shufflr)

<img src="http://blog.bazoud.com/images/ssd5.png" alt="">

* [Ekino](http://www.ekino.com)

<img src="http://blog.bazoud.com/images/ssd9.png" alt="">

* IRC Plugin screenshot @ exoplatform

<img src="http://blog.bazoud.com/images/ssd6.png" alt="">

Contribute
=======

Here's the most direct way to get your work merged into the project.

1. Fork the project
2. Clone down your fork
3. Create a feature branch
4. Hack away and add tests, not necessarily in that order
5. Make sure everything still passes by running tests
6. If necessary, rebase your commits into logical chunks without errors
7. Push the branch up to your fork
8. Send a pull request for your branch

In the news
=======

* IT Wars: [StatusDashboard monitoring avec Node.js](http://www.it-wars.com/article265/statusdashboard-monitoring-avec-node-js)
* William Durand blog: [Services Status Dashboard](http://williamdurand.fr/2012/01/16/services-status-dashboard/)
* C.Hamerling blog: [Node.js client for Status Dashboard](http://chamerling.wordpress.com/2012/10/23/node-js-client-for-status-dashboard/)
* C.Hamerling blog: [Monitoring Tool in the Cloud in (less than) 2 minutes...](http://chamerling.wordpress.com/2013/01/24/monitoring-tool-in-the-cloud-in-less-than-2-minutes/)

Licence
=======

Statusdashboard is provided under Apache Software Licence 2.0.

