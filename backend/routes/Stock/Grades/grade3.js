const express = require("express")
const {Grade3} = require("../../../models/grade3Model")

const router =  express.Router()

router.post("/grade3-form", async(req, res)=> {
    try {

        const newGrade3 = new Grade3({
            
            stockId: req.body.stockId,
            stockDate: req.body.stockDate,
            quantity: req.body.quantity,
        });

        // Save the new employee to the database
        await newGrade3.save();

        // Send a success response
        res.status(203).json({ message: 'Grade3 created successfully', grade3: newGrade3 });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating Grade3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

router.get("/grade3-details", async(req, res)=> {
    try {

        const grade3s = await Grade3.find();
        res.send(grade3s)

     
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating grade3:', error);
        res.status(500).json({ message: 'Internal server error' });
    } 
});


router.delete('/grade3-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        // Find and delete grade3 by ID
        const deletedGrade3 = await Grade3.findOneAndDelete({ stockId: stockId });
        if (deletedGrade3) {
            console.log('Grade3 deleted:', deletedGrade3);
            res.status(200).json({ message: `Grade3 with ID ${stockId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Grade3 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting grade3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/grade3-details/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const updatedGrade3 = await Grade3.findOneAndUpdate({ stockId: stockId }, req.body, { new: true });
        if (updatedGrade3) {
            console.log('Grade3 updated:', updatedGrade3);
            res.status(200).json({ message: `Grade3 with ID ${stockId} updated successfully.`, grade3: updatedGrade3 });
        } else {
            res.status(404).json({ error: `Grade3 with ID ${stockId} not found.` });
        }
    } catch (error) {
        console.error('Error updating grade3:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;