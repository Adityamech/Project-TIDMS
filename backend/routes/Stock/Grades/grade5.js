const express = require("express")
const {Grade5} = require("../../../models/grade5Model")

const router =  express.Router()

router.post("/grade5-form", async(req, res)=> {
    try {

        const newGrade5 = new Grade5({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade5.save();

        // Send a success response
        res.status(205).json({ message: 'Grade5 created successfully', grade5: newGrade5 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade5:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade5-details", async(req, res)=> {
    try {

        const grade5s = await Grade5.find();
        res.send(grade5s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade5:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade5-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade5 by ID
        const deletedGrade5 = await Grade5.findOneAndDelete({ stockId: stockId });
        if (deletedGrade5) {
            console.log('Grade5 deleted:', deletedGrade5);
            res.status(200).json({ message: `Grade5 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade5 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade5:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade5-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade5 = await Grade5.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade5) {
            console.log('Grade5 updated:', updatedGrade5);
            res.status(200).json({ message: `Grade5 with ID ${stockId} updated successfully.`, grade5: updatedGrade5 });
        } else {
            res.status(404).json({ error: `Grade5 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade5:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;