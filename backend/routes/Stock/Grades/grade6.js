const express = require("express")
const {Grade6} = require("../../../models/grade6Model")

const router =  express.Router()

router.post("/grade6-form", async(req, res)=> {
    try {

        const newGrade6 = new Grade6({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade6.save();

        // Send a success response
        res.status(206).json({ message: 'Grade6 created successfully', grade6: newGrade6 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade6:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade6-details", async(req, res)=> {
    try {

        const grade6s = await Grade6.find();
        res.send(grade6s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade6:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade6-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade6 by ID
        const deletedGrade6 = await Grade6.findOneAndDelete({ stockId: stockId });
        if (deletedGrade6) {
            console.log('Grade6 deleted:', deletedGrade6);
            res.status(200).json({ message: `Grade6 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade6 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade6:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade6-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade6 = await Grade6.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade6) {
            console.log('Grade6 updated:', updatedGrade6);
            res.status(200).json({ message: `Grade6 with ID ${stockId} updated successfully.`, grade6: updatedGrade6 });
        } else {
            res.status(404).json({ error: `Grade6 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade6:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;