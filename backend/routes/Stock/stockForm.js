const express = require("express")
const {Stock} = require("../../models/stockModel")

const router =  express.Router()

router.post("/stock-form", async(req, res)=> {
    try {

        const newStock = new Stock({
            stockDate : req.body.stockDate,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newStock.save();

        // Send a success response
        res.status(201).json({ message: 'Stock created successfully', stock: newStock });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

module.exports = router;