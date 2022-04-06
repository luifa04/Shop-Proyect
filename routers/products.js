const express = require('express')
const faker = require('faker')

const router = express.Router();


router.get('/',(req,res) =>{
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i< limit ; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      Image: faker.image.imageUrl(),
    })
  }

  res.json(products);
});

router.post('/',(req, res) => {
 const {name, price, image} = req.body;
 console.log(name + "" + price+ "" + image );
 res.json({
   message : "created"
 })
})

module.exports = router;
