const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roasterSchema = new Schema({
    username: String,
    password: String,
    brandname: String,
    imgName: String,
    imgPath: String,
    description: String,
    location: String,
    coffees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Coffee'
        }
    ],
})

const Roaster = mongoose.model('Roaster', roasterSchema);
module.exports = Roaster;