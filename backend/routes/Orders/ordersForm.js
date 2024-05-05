const express = require("express")
const {Orders} = require("../../models/ordersModel")

const router =  express.Router()

router.post("/orders-form", async(req, res)=> {
    try {

        // Create a new order instance
        const newOrders = new Orders({
            date : req.body.date,
            ordersId : req.body.ordersId,
            customerName : req.body.customerName,
            customerNumber : req.body.customerNumber,
            productName: req.body.productName,
            quantity: req.body.quantity,
            advance: req.body.advance,
            balance: req.body.balance,
            paymentStatus: req.body.paymentStatus,
            deliveryStatus: req.body.deliveryStatus
        });

        

        // Save the new order to the database
        await newOrders.save();

        // Send a success response
        res.status(201).json({ message: 'order created successfully', orders: newOrders });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

module.exports = router;