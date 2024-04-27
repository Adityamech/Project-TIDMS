const express = require("express")
const {Stock} = require("../../models/stockModel")

const router =  express.Router()


router.get("/stock-details", async(req, res)=> {
    try {

        const stocks = await Stock.find();
        res.send(stocks)

     
        // Send a success response
        // res.status(201).json({ message: 'Data displayed', employee: newEmployee });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating :', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

});


router.delete('/stock-details/:product', async (req, res) => {
    const { product } = req.params;
    try {
        // Find and delete employee by ID
        const deletedStock = await Stock.findOneAndDelete({ product: product });
        if (deletedEmployee) {
            console.log(' deleted:', deletedStock);
            res.status(200).json({ message: `Stock with ID ${product} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Stock with ID ${product} not found.` });
        }
    } catch (error) {
        console.error('Error deleting Stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/stock-details/:product', async (req, res) => {
    const { product } = req.params;
    try {
        // Find the employee by product and update its data
        const updatedStock = await Stock.findOneAndUpdate({ product: product }, req.body, { new: true });
        if (updatedEmployee) {
            console.log('Employee updated:', updatedStock);
            res.status(200).json({ message: `Employee with ID ${product} updated successfully.`, Stock: updatedStock });
        } else {
            res.status(404).json({ error: `Employee with ID ${product} not found.` });
        }
    } catch (error) {
        console.error('Error updating Stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;