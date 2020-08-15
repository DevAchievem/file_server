const net = require('net');
const fs = require('fs');

const port = 3000;
// const host = 'localhost';

const server = net.createServer();


server.listen(port, function() {
  console.log(`Server is listening on socket localhost:${port}.`);
});

server.on('connection', function(socket) {
  console.log('connection established.');

  // socket.write('hello, client');

  socket.on('data', function(data) {
    console.log(`data request received from client ${data.toString()}.`);
    fs.exists('data', (exists) => {
      if (exists) {
        fs.readFile('data', 'utf8', (err, data) => {
          if (err) throw err;
          socket.write(data);
          console.log('data has been written to socket');
        });
      }
    });
  });

  socket.on('end', function() {
    console.log('connection closed');
  });

  socket.on('error', function(err) {
    console.log(`Error: ${err}`);
  });
});


//I made mine dead-simple, since I hadn't done anything like that before. I went with text files only, and made it so that when a client connects, it just asks for the name of the file you want with a readline (I didn't bother scanning a directory and sending an index of contents or anything like that, so it assumes the client already knows the file they want), and then sends the answer to the server, which checks if that file exists, and if it does, it loads the contents as a string and sends it back to the client, which takes the string and writes it to a file with fs