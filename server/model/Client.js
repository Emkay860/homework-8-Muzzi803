// // TODO update this and define a Mongoose schema and model!
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// // class Client {
// //   constructor(name, email) {
// //     this._id = uuidv4();
// //     this.name = name;
// //     this.email = email;
// //   }
// // }
// const Client = new mongoose.Schema({
//   _id: { type: "string", default: uuidv4() },
//   name: String,
//   email: { type: "string", required: true, unique: true },
// });

// module.exports = Client;

// TODO update this and define a Mongoose schema and model!
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// class Client {
//   constructor(name, email) {
//     this._id = uuidv4();
//     this.name = name;
//     this.email = email;
//   }
// }
const ClientSchema = new mongoose.Schema({
  _id: { type: 'string', default: uuidv4() },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
});

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
