require('dotenv').config();
const express = require('express');
const { getKey, getId } = require('./util/key');
const { sendKey } = require('./service/email');
const { index, register, confirm } = require('./views/pages');
const ClientDao = require('./data/ClientDao');

const app = express();
const port = process.env.PORT || 5050;

const clients = new ClientDao();

// You need this to parse submitted form data!
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send(index());
});

app.get('/api/clients', async (req, res) => {
  // TODO users must not get the clients data unless
  //  they provide a valid API Key
  console.log(req.query.key);
  if (!req.query.key || req.query.key === '') {
    return res.status(400).json({ msg: 'api key is required' });
  }
  let api_key = req.query.key;
  let uuid = '';
  try {
    uuid = getId(api_key);
    const client = await clients.read(uuid);
    console.log(client);
    if (!client) {
      return res.status(404).json({ msg: 'user not found' });
    } else {
      return res.status(200).json(client);
    }
  } catch (e) {
    console.error(e);
    return res.status(403).json({ msg: 'api key is invalid' });
  }

  // const data = await clients.readAll();
  // return res.status(200).json({
  //   data,
  // });
});

app.get('/register', (_req, res) => {
  res.send(register());
});

app.post('/register', async (req, res) => {
  const { name, email } = req.body;

  try {
    const data = await clients.create({ name, email });
    const key = getKey(data._id);
    sendKey(name, email, key);
    res.send(confirm(name, true));
  } catch (err) {
    res.send(confirm(name, false));
  }
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
