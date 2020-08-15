const net = require('net');
const fs = require('fs');
const readline = require('readline');

const port = 3000;
// const host = 'localhost';

const client = net.createConnection({ port }, () => {
  console.log('connected to Server!');
  client.write('world!\r\n');
});

client.on('connect', () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('please enter the url you wish to request from the server: ', (dataRequested) => {
    client.write(dataRequested);
    rl.close;
  });
});

client.on('data', (data) => {
  fs.writeFile('test.txt', data, function(err) {
    if (err) throw err;
    fs.stat(data, function(err, stats) {
      console.log("downloaded and saved " + stats.size + " bytes to " + data);
    });
  });
  client.end;
});

client.on('end', () => {
  console.log('disconnected from server');
});