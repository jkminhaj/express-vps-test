const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;

// Random terminal colors
const colors = [
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Request logger
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  const calledAt = new Date();

  res.on('finish', () => {
    const end = process.hrtime.bigint();

    // Convert nanoseconds to milliseconds
    const latency = Number(end - start) / 1_000_000;

    const color = randomColor();

    console.log(
      color(
        `[${calledAt.toLocaleTimeString()}] ` +
        `${req.method} ${req.originalUrl} ` +
        `→ ${res.statusCode} ` +
        `| ${latency.toFixed(2)} ms`
      )
    );
  });

  next();
});


// Home route
app.get('/', (req, res) => {
  res.send('Server is working fine!');
});


// Test API
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    time: new Date().toISOString(),
  });
});


// Another test API
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from the VPS!',
  });
});


// Start server
app.listen(port, () => {
  console.log(
    chalk.green(`✔ Server is running on port ${port}`)
  );

  console.log(
    chalk.cyan(`→ http://localhost:${port}`)
  );
});