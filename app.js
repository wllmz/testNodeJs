const express = require('express');
const app = express();
const port = 8080;

let fibonacciCache = {};
const MAX_FIB = 92;

// Fonction pour calculer Fibonacci avec mise en cache
function fibonacci(n) {
  if (n in fibonacciCache) {
    return fibonacciCache[n];
  }
  if (n <= 1) {
    return n;
  }
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  fibonacciCache[n] = result;
  return result;
}

// Préremplir le cache
for (let i = 0; i <= MAX_FIB; i++) {
  console.log("Cache: fib", i);
  fibonacci(i);
}

// Route pour calculer un nombre Fibonacci
app.get('/fibonacci/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);

  if (isNaN(number)) {
    return res.status(400).send('Veuillez fournir un nombre valide');
  }

  if (number < 0) {
    return res.status(400).send('Veuillez fournir un nombre positif');
  }

  if (number > MAX_FIB) {
    return res.status(413).send('La valeur est trop grande pour une exécution efficace');
  }

  const result = fibonacci(number);
  res.send(`Fibonacci(${number}) = ${result}`);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
