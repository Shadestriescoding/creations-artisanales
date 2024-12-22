const { spawn } = require('child_process');
const path = require('path');

// Démarrer le serveur backend
const server = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  shell: true
});

// Démarrer le frontend React
const client = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

// Gestion des erreurs
server.on('error', (error) => {
  console.error('Erreur du serveur:', error);
});

client.on('error', (error) => {
  console.error('Erreur du client:', error);
});

// Gestion de la fermeture
process.on('SIGINT', () => {
  server.kill();
  client.kill();
  process.exit();
}); 