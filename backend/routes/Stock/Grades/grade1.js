const express = require("express")
const {Grade1} = require("../../../models/grade1Model")

const router =  express.Router()

router.post("/grade1-form", async(req, res)=> {
    try {

        const newGrade1 = new Grade1({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade1.save();

        // Send a success response
        res.status(201).json({ message: 'Grade1 created successfully', grade1: newGrade1 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade1:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade1-details", async(req, res)=> {
    try {

        const grade1s = await Grade1.find();
        res.send(grade1s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade1:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade1-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade1 by ID
        const deletedGrade1 = await Grade1.findOneAndDelete({ stockId: stockId });
        if (deletedGrade1) {
            console.log('Grade1 deleted:', deletedGrade1);
            res.status(200).json({ message: `Grade1 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade1 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade1:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade1-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade1 = await Grade1.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade1) {
            console.log('Grade1 updated:', updatedGrade1);
            res.status(200).json({ message: `Grade1 with ID ${stockId} updated successfully.`, grade1: updatedGrade1 });
        } else {
            res.status(404).json({ error: `Grade1 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade1:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;