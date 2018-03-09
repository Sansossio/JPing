// Imports
const net = require('net');
const { Resolver } = require('dns');
// Class
class Ping {
  /**
   * Ping
   * @param {string} host Host to request
   * @param {number} port  Port
   * @param {number} infinite Execute infinite
   * @param {number} Timeout of connection
   */
  constructor({
    host,
    port,
    infinite,
    timeout,
  }) {
    // Properties
    this.host = host;
    this.port = port;
    this.timeout = timeout || 3000;
    this.infinite = infinite;
    // Config
    this.net = net;
    this.resolver = new Resolver();
    // Others
    this.isDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/g;
    this.average = 0;
    this.attempts = 0;
  }
  MyAverage() {
    return (this.average / this.attempts).toFixed(2);
  }
  Print(total) {
    // Print
    console.log(`JPing: Reply from ${this.host} (port: ${this.port}), time = ${total}ms, average = ${this.MyAverage()}ms`);
  }
  ResolverDomain() {
    // This
    const self = this;
    // Logic response
    const response = (resolve, reject) => {
      // Resolver
      this.resolver.resolve4(self.host, (err, ip) => {
        if (err) reject(err); // Error handler
        else resolve(ip);
      });
    };
    // Return
    return new Promise(response);
  }
  Send(logs = true) {
    // Print logs
    if (logs) {
      // Detect if is domain
      const domain = this.host.match(this.isDomain);
      if (domain) {
        // Resolver
        this.ResolverDomain()
          .then((ip) => {
            // Send logs
            console.log(`JPing: Pinging to ${domain[0]} (ip = ${ip}, port = ${this.port})`);
            // Init system
            this.Send(false);
          })
          .catch(console.error);
      } else {
        // Log
        console.log(`JPing: Pinging to ${this.host} on port ${this.port}`);
        // Send
        this.Send(false);
      }
      return;
    }
    // Config
    const socket = net.Socket();
    this.Run(socket);
  }
  Run(socket) {
    // Config
    const startTime = new Date().getTime();
    // Start
    socket.connect(this.port, this.host, () => {
      // ResponseTime
      const responseTime = new Date().getTime();
      // Calcule
      const total = responseTime - startTime;
      // Properties
      this.attempts += 1;
      this.average += total;
      // Print
      this.Print(total);
      // Repeat
      if (this.infinite || this.attempts < 5) {
        setTimeout(() => this.Send(false), 600);
      } else {
        console.info(`JPing: Ping average = ${this.MyAverage()}ms`);
        process.exit();
      }
    });
    // Error handler
    socket.on('error', () => {
      console.error(`JPing: Error connection to ${this.host}:${this.port}`);
    });
  }
}

// Export
module.exports = Ping;
