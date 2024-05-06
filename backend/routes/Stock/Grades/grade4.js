const express = require("express")
const {Grade4} = require("../../../models/grade4Model")

const router =  express.Router()

router.post("/grade4-form", async(req, res)=> {
    try {

        const newGrade4 = new Grade4({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade4.save();

        // Send a success response
        res.status(204).json({ message: 'Grade4 created successfully', grade4: newGrade4 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade4:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade4-details", async(req, res)=> {
    try {

        const grade4s = await Grade4.find();
        res.send(grade4s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade4:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade4-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade4 by ID
        const deletedGrade4 = await Grade4.findOneAndDelete({ stockId: stockId });
        if (deletedGrade4) {
            console.log('Grade4 deleted:', deletedGrade4);
            res.status(200).json({ message: `Grade4 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade4 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade4:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade4-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade4 = await Grade4.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade4) {
            console.log('Grade4 updated:', updatedGrade4);
            res.status(200).json({ message: `Grade4 with ID ${stockId} updated successfully.`, grade4: updatedGrade4 });
        } else {
            res.status(404).json({ error: `Grade4 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade4:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;