const net = require('net');

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false); // Port is in use
      } else {
        reject(err); // Other error
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(true); // Port is available
    });

    server.listen(port);
  });
}

async function findAvailablePort(startPort, endPort) {
  for (let port = startPort; port <= endPort; port++) {
    const isAvailable = await checkPort(port);
    if (isAvailable) {
      return port;
    }
  }
  throw new Error('No available ports found');
}

// Exemplo de uso
const startPort = 1000;
const endPort = 8000;

findAvailablePort(startPort, endPort)
  .then((port) => {
    console.log(`A porta ${port} está disponível para uso.`);
    // Use a porta em sua aplicação Node.js aqui
  })
  .catch((err) => {
    console.error('Erro ao encontrar uma porta disponível:', err);
  });