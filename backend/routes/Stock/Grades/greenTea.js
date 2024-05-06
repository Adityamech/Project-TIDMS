const express = require("express")
const {GreenTea} = require("../../../models/greenTeaModel")

const router =  express.Router()

router.post("/greenTea-form", async(req, res)=> {
    try {

        const newGreenTea = new GreenTea({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGreenTea.save();

        // Send a success response
        res.status(201).json({ message: 'GreenTea created successfully', greenTea: newGreenTea });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating GreenTea:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/greenTea-details", async(req, res)=> {
    try {

        const greenTeas = await GreenTea.find();
        res.send(greenTeas)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating greenTea:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/greenTea-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete greenTea by ID
        const deletedGreenTea = await GreenTea.findOneAndDelete({ stockId: stockId });
        if (deletedGreenTea) {
            console.log('GreenTea deleted:', deletedGreenTea);
            res.status(200).json({ message: `GreenTea with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `GreenTea with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting greenTea:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/greenTea-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGreenTea = await GreenTea.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGreenTea) {
            console.log('GreenTea updated:', updatedGreenTea);
            res.status(200).json({ message: `GreenTea with ID ${stockId} updated successfully.`, greenTea: updatedGreenTea });
        } else {
            res.status(404).json({ error: `GreenTea with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating greenTea:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;