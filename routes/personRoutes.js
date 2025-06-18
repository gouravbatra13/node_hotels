const express = require('express');
const router = express.Router();
/**import model */
const Person = require('../models/Person');

/**save person */
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        // Capitalized model name (assuming you imported it as 'Person')
        const newPerson = new Person(data);

        const saveData = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(saveData);
    } catch (error) {
        console.error('Error saving person:', error);
        // res.status(500).json({ error: 'Internal server error' });
        res.status(500).json({
            error
        });
    }
});


/** get all person */
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error saving person:', error);
        // res.status(500).json({ error: 'Internal server error' });
        res.status(500).json({
            error
        });
    }
})


/** get one person by id */
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Person.find({
            _id: id
        });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error saving person:', error);
        // res.status(500).json({ error: 'Internal server error' });
        res.status(500).json({
            error
        });
    }
})


/**
 * Get person data by work
 */
router.get('/search/:workType', async (req, res) => {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
        try {
            const data = await Person.find({
                work: workType
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(404).json({
            error: 'Invalid Type'
        });
    }
})


/** Delete by id */
// router.delete('delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = Person.deleteOne({
//             _id: id
//         });
//         res.status(200).json('Deleted Successfully');
//     } catch (error) {
//         console.error('Error fetching person:', error);
//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// })


/**
 * update
 */
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedData, {
            // return the updated document
            new: true,
            // run mongoose validation
            runValidators: true,
        });

        if (!response) {
            res.status(404).json({
                error: "Person not found"
            });
        }

        res.status(200).json({
            success: response
        });
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})


/**
 * delete
 */
router.delete('/:id',async(req,res)=>{
    try {
        
         const personId = req.params.id;
         const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            res.status(404).json({
                error: "Person not found"
            });
        }

        res.status(200).json({
            success: response
        });

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router;