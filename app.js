const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Bonjour, Monde !');
});

const server = app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);

  sendRequests(10).then(() => {
    server.close();
  });
});

const axios = require('axios');

const sendRequests = async (numRequests) => {
  try {
    for (let i = 0; i < numRequests; i++) {
      await axios.get(`http://localhost:${port}/`)
        .then(response => {
          console.log(`Requête ${i + 1}:`, response.data);
        })
        .catch(error => {
          console.error(`Erreur sur la requête ${i + 1}:`, error.message);
        });
    }
  } catch (error) {
    console.error('Erreur globale:', error.message);
  }
};
