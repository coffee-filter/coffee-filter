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
    roaster: {
        type: Schema.Types.ObjectId,
        ref: 'Roaster'
    },
    characteristics: {
        strength: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        acidity: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        method: {
            imgName: String,
            imgPath: String,
            imgPublicId: String
        },
        price: Number,
        tasteProfile: String
    }
})

const Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;