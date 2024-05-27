const express = require('express');
const router = express.Router();
const Order = require('../models/order.js');
//Add new order
router.post('/', async (req, res) => {
const commandeData = req.body;
try{
const mtcmd = commandeData.lineOrder.reduce((acc, lc) => acc +
lc.totalPrice, 0);
const newOrder = new Order({
client: commandeData.client,
total: parseFloat(mtcmd).toFixed(3),
status:'Not processed',
lineOrder: commandeData.lineOrder.map((lc) => ({
articleID: lc.articleID,
quantity: lc.quantity,
totalPrice: lc.totalPrice
})),
});
await newOrder.save();
res.status(200).json({ message: 'sucess' ,order : newOrder});
} catch (error) {
console.error(error);
res.status(409).json({ message: error.message });
}
});
module.exports = router;