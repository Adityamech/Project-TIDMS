const express = require("express")
const {Grade7} = require("../../../models/grade7Model")

const router =  express.Router()

router.post("/grade7-form", async(req, res)=> {
    try {

        const newGrade7 = new Grade7({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade7.save();

        // Send a success response
        res.status(207).json({ message: 'Grade7 created successfully', grade7: newGrade7 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade7:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade7-details", async(req, res)=> {
    try {

        const grade7s = await Grade7.find();
        res.send(grade7s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade7:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade7-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade7 by ID
        const deletedGrade7 = await Grade7.findOneAndDelete({ stockId: stockId });
        if (deletedGrade7) {
            console.log('Grade7 deleted:', deletedGrade7);
            res.status(200).json({ message: `Grade7 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade7 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade7:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade7-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade7 = await Grade7.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade7) {
            console.log('Grade7 updated:', updatedGrade7);
            res.status(200).json({ message: `Grade7 with ID ${stockId} updated successfully.`, grade7: updatedGrade7 });
        } else {
            res.status(404).json({ error: `Grade7 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade7:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;