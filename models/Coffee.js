const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    name: String,
    beans: {
        imgName: String,
        imgPath: String,
        imgPublicId: String
    },
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
        enum: ["Mokka Pot", "V60", "French Press", "Aereo Press", "Chemex", "Espresso Machine"]
    },
    price: Number,
    tasteProfile: {
        nutty: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        sweet: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        herbal: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        chocolate: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        floral: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        }
    },
    roaster: {
        type: Schema.Types.ObjectId,
        ref: 'Roaster'
    }
})

const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;