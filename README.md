# JPing

[![N|Solid](https://www.abarsys.com/assets/npm_logo-bc1b72b3bba0c252e7af0a070bee650a3f725019bb339bea1891bdfa83faa2cc.png)](https://nodesource.com/products/nsolid)

JPing is a tool for see ping in ms between your and a remote server

## Install
```sh
npm install jping -g
```
### Examples
Simple usage
```sh
jping google.com
```
With port
```sh
jping google.com:443
```
Logs in loop
```sh
jping google.com -i
```
Help command
```sh
jping -h
jping --help
```

### Example outupt
```
JPing: Pinging to google.com (ip = 172.217.16.238, port = 80)
JPing: Reply from google.com (port: 80), time = 43ms, average = 43.00ms
JPing: Reply from google.com (port: 80), time = 7ms, average = 25.00ms
JPing: Reply from google.com (port: 80), time = 5ms, average = 18.33ms
JPing: Reply from google.com (port: 80), time = 4ms, average = 14.75ms
JPing: Reply from google.com (port: 80), time = 5ms, average = 12.80ms
JPing: Ping average = 12.80ms
```
