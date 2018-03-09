#!/usr/bin/env node
// Modules
const params = require('./params');
const JPing = require('../index');
// Get arguments, delete 0 and 1 params
const args = process.argv.splice(process.execArgv.length + 2);
// Define params
const myParams = params(args);
// Info
if (Object.keys(myParams) === 0 || myParams.h || myParams.help) {
  console.info('JPing help');
  console.info('Params:');
  console.info('\t -h or --host = Hostname to ping');
  console.info('\t -p or --port = Port');
  console.info('\t -i or --infinite = Send ping in loop');
  console.info('Examples:');
  console.info('\t jping google.com');
  console.info('\t jping google.com:443');
  console.info('\t jping google.com:443 -i');
  console.info('\t jping -h google.com -p 443 -i');
  console.info('\t jping -host google.com -port 443 -infinite');
  process.exit();
}
// Condition
if (!(myParams.h || myParams.host) || !(myParams.p || myParams.port)) {
  console.info('JPing need a hostname to send request');
  process.exit();
}
// Extract params
// Config
const config = {
  host: myParams.h || myParams.host,
  port: myParams.p || myParams.port,
  infinite: myParams.i || myParams.infinite || false,
};
// Init
const ping = new JPing(config);

ping.Send();
