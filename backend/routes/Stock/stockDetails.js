const express = require("express");
const { Stock } = require("../../models/stockModel");

const router = express.Router();

router.get("/stock-details", async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.send(stocks);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/stock-details/:product', async (req, res) => {
    const { product } = req.params;
    try {
        const deletedStock = await Stock.findOneAndDelete({ product: product });
        if (deletedStock) {
            console.log('Deleted stock:', deletedStock); // Changed from deletedEmployee to deletedStock
            res.status(200).json({ message: `Stock with ID ${product} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Stock with ID ${product} not found.` });
        }
    } catch (error) {
        console.error('Error deleting stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/stock-details/:product', async (req, res) => {
    const { product } = req.params;
    try {
        const updatedStock = await Stock.findOneAndUpdate({ product: product }, req.body, { new: true });
        if (updatedStock) {
            console.log('Stock updated:', updatedStock);
            res.status(200).json({ message: `Stock with ID ${product} updated successfully.`, stock: updatedStock });
        } else {
            res.status(404).json({ error: `Stock with ID ${product} not found.` });
        }
    } catch (error) {
        console.error('Error updating stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
