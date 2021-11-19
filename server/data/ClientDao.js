// TODO update this to persist data in MongoDB!

const Client = require('../model/Client');
const ApiError = require('../model/ApiError');
const mongoose = require('mongoose');

// mongodb+srv://root:<password>@apiappcluster.ij4dl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
class ClientDao {
  constructor() {
    // this.clients = [];
    this.db = null;
    this.initDb();
    this.clients = null;
  }

  async initDb() {
    this.db = await mongoose.connect(process.env.MONGO_URI);
    // this.clients = mongoose.model("client", Client);
    this.clients = Client;
    console.log(process.env.MONGO_URI);
  }

  async create({ name, email }) {
    if (name === undefined || name === '') {
      throw new ApiError(400, 'Every client must have a none-empty name!');
    }

    if (email === undefined || email === '') {
      throw new ApiError(400, 'Every client must have a valid email!');
    }

    const client = new Client({ name, email });
    try {
      client.save().then(() => {});
    } catch (err) {}

    // this.clients.push(client);
    return client;
  }

  // clients may not change their email!
  async update(id, { name }) {
    const index = this.clients.findIndex((client) => client._id === id);

    if (index === -1) {
      throw new ApiError(404, 'There is no client with the given ID!');
    }

    if (name !== undefined) {
      this.clients[index].name = name;
    }

    return this.clients[index];
  }

  async delete(id) {
    const index = this.clients.findIndex((client) => client._id === id);

    if (index === -1) {
      throw new ApiError(404, 'There is no client with the given ID!');
    }

    const client = this.clients[index];
    this.clients.splice(index, 1);
    return client;
  }

  // returns an empty array if there is no client with the given ID
  async read(id) {
    // return this.clients.find((client) => client._id === id);
    return this.clients.find({ _id: id });
  }

  // returns an empty array if there is no client in the database
  //  or no client matches the search queries
  async readAll(query = '') {
    if (query !== '') {
      return this.clients.filter(
        (client) => client.name === query || client.email === query
      );
    }
    return this.clients;
  }
}

module.exports = ClientDao;
