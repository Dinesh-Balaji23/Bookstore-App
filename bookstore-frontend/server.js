const express = require('express');
const client = require('prom-client');
const path = require('path');

const app = express();

// metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const pageCounter = new client.Counter({
  name: 'frontend_page_visits_total',
  help: 'Total page visits',
});

const apiCounter = new client.Counter({
  name: 'frontend_api_calls_total',
  help: 'Total API calls from frontend',
});

// track visits
app.use((req, res, next) => {
  pageCounter.inc();
  next();
});

// serve React build
app.use(express.static(path.join(__dirname, 'build')));

// metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000, () => console.log('Frontend running on port 3000'));