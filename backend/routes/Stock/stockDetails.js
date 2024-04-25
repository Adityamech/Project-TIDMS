const express = require("express")
const {Stock} = require("../../models/stockModel")

const router =  express.Router()

router.get("/stock-details", async(req, res)=> {
    try {

        const stocks = await Stock.find();
        res.send(stocks)

   
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

module.exports = router;