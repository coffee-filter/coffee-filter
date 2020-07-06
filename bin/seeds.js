const mongoose = require('mongoose');
const Roaster = require('../models/Roaster');
const Coffee = require('../models/Coffee');

mongoose.connect('mongodb://localhost/coffee-filter', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const initialRoaster = [
//     {
//         username: "coffeecircle",
//         password: "12345678",
//         brandname: "Coffee Circle",
//         logo: "",
//         description: "Awesome coffee beans in Berlin",
//         location: "Berlin"
//     }
// ];

const initialCoffees = [
    {
        name: "Kivu Kaffee",
        beans: {
            imgName: "String",
            imgPath: "https://www.coffeecircle.com/media/image/54/43/ff/kivu-freisteller-shopware_600x600.jpg",
            imgPublicId: "String"
        },
        description: "The Kivu is our first coffee from the Congo. In recent years, the Kawa Kabuya cooperative has received several awards for the outstanding quality of its coffees.",
        location: "DR Congo",
        strength: 3,
        acidity: 2,
        method: ["V60", "French Press"],
        price: 9.90,
        tasteProfile: {
            nutty: 3,
            sweet: 2,
            herbal: 5,
            chocolate: 1,
            floral: 4
        },
        roaster: "5f02f27c83613ad829b5522c"
    },
    {
        name: "Canela Kaffee & Espresso",
        beans: {
            imgName: "String",
            imgPath: "https://www.coffeecircle.com/media/image/d6/f7/63/coffeecircle-Canela-filtercoffee-esoresso_600x600.png",
            imgPublicId: "String"
        },
        description: "The Canela surprises with intense spicy aromas and a particularly complex taste. The 100% Arabica coffee from Colombia reminds of the taste of cinnamon paired with notes of apples and milk chocolate.",
        location: "Columbia",
        strength: 5,
        acidity: 4,
        method: ["Mokka Pot", "Espresso Machine"],
        price: 9.90,
        tasteProfile: {
            nutty: 4,
            sweet: 2,
            herbal: 2,
            chocolate: 5,
            floral: 2
        },
        roaster: "5f02f27c83613ad829b5522c"
    }
];


Coffee.insertMany(initialCoffees)
  .then(result => {
    console.log('Seed successfull');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`An error occured: ${err}`);
  });