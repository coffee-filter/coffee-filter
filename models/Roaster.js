const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roasterSchema = new Schema({
    username: String,
    password: String,
    brandname: String,
    logo: String,
    description: String,
    location: String
})

const Roaster = mongoose.model('Roaster', roasterSchema);
module.exports = Roaster;