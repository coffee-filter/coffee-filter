const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    name: String,
    imgName: String,
    imgPath: String,
    description: String,
    location: String,
    strength: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    acidity: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    method: {
        type: [String],
        enum: ["mokkapot", "v60", "frenchpress", "aeropress", "chemex", "espressomachine"]
    },
    price: String,
    tasteProfile: {
        type: [String],
        enum: ["nutty", "sweet", "herbal", "chocolate", "floral"]
    },
    roaster: {
        type: Schema.Types.ObjectId,
        ref: 'Roaster'
    }
})

const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;