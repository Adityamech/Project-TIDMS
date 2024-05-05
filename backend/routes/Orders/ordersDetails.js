const express = require("express")
const {Orders} = require("../../models/ordersModel")

const router =  express.Router()


router.get("/orders-details", async(req, res)=> {
    try {

        const orders = await Orders.find();
        res.send(orders)

     
        // Send a success response
        // res.status(201).json({ message: 'Data displayed', orders: newOrders });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/orders-details/:ordersId', async (req, res) => {
    const { ordersId } = req.params;
    try {
        // Find and delete Orders by ID
        const deletedOrders = await Orders.findOneAndDelete({ ordersId: ordersId });
        if (deletedOrders) {
            console.log('Orders deleted:', deletedOrders);
            res.status(200).json({ message: `Orders with ID ${ordersId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Orders with ID ${ordersId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting Orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/orders-details/:ordersId', async (req, res) => {
    const { ordersId } = req.params;
    try {
        const updatedOrders = await Orders.findOneAndUpdate({ ordersId: ordersId }, req.body, { new: true });
        if (updatedOrders) {
            console.log('Orders updated:', updatedOrders);
            res.status(200).json({ message: `Orders with ID ${ordersId} updated successfully.`, Orders: updatedOrders });
        } else {
            res.status(404).json({ error: `Orders with ID ${ordersId} not found.` });
        }
    } catch (error) {
        console.error('Error updating Orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.get("/search", async (req, res) => {
//     try {
//         // Extract the search parameters from the request query
//         const { customerName, productName } = req.query;

//         // Construct the search query
//         const searchQuery = {};
//         if (customerName) {
//             searchQuery.customerName = { $regex: new RegExp(customerName, 'i') };
//         }
//         if (productName) {
//             searchQuery.productName = { $regex: new RegExp(productName, 'i') };
//         }

//         // Perform the search
//         const orders = await Orders.find(searchQuery);

//         // Send the search results
//         res.status(200).json({ message: 'Search results', orders: orders });
//     } catch (error) {
//         // Send an error response if something goes wrong
//         console.error('Error searching orders:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



module.exports = router;