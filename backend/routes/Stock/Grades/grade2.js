const express = require("express")
const {Grade2} = require("../../../models/grade2Model")

const router =  express.Router()

router.post("/grade2-form", async(req, res)=> {
    try {

        const newGrade2 = new Grade2({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade2.save();

        // Send a success response
        res.status(202).json({ message: 'Grade2 created successfully', grade2: newGrade2 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade2:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade2-details", async(req, res)=> {
    try {

        const grade2s = await Grade2.find();
        res.send(grade2s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade2:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade2-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade2 by ID
        const deletedGrade2 = await Grade2.findOneAndDelete({ stockId: stockId });
        if (deletedGrade2) {
            console.log('Grade2 deleted:', deletedGrade2);
            res.status(200).json({ message: `Grade2 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade2 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade2:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade2-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade2 = await Grade2.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade2) {
            console.log('Grade2 updated:', updatedGrade2);
            res.status(200).json({ message: `Grade2 with ID ${stockId} updated successfully.`, grade2: updatedGrade2 });
        } else {
            res.status(404).json({ error: `Grade2 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade2:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;