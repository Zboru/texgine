const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require('connect-history-api-fallback');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = require('./middleware/auth');

app.use(authMiddleware);

const routes = require('./routes');

app.use(routes);

const routes1 = require('./routes/user');

app.use(routes1);

const staticFileMiddleware = express.static(`${__dirname}../../../dist`);
app.use(staticFileMiddleware);
app.use(history({
  index: '/index.html',
}));
app.use(staticFileMiddleware);

// listen on the port
const port = 1337;
app.listen(port);
console.log('Listening at port', port);

app.all('*', (_req, res) => {
  try {
    console.log(`${__dirname}../../dist/index.html`);
    res.sendFile(path.resolve(`${__dirname}../../../dist/index.html`));
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Something went wrong' });
  }
});
