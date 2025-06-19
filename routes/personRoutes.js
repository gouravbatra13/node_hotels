const express = require('express');
const router = express.Router();
/**import model */
const Person = require('../models/Person');

/**import jwt */
const {
    jwtAuthMiddleware,
    generateToken
} = require('./../jwt');

/**save person */
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        // Capitalized model name (assuming you imported it as 'Person')
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');

        const payload = {
            id: response.id,
            username: response.username,
        }
        const token = generateToken(payload);
        console.log('token', token);


        res.status(200).json({
            response: response,
            token: token
        });
    } catch (error) {
        console.error('Error saving person:', error);
        // res.status(500).json({ error: 'Internal server error' });
        res.status(500).json({
            error
        });
    }
});


/**
 * login
 */

router.post('/login', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const user = await Person.findOne({
            username: username
        });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                error: 'Invalid username or password'
            });
        }

        /**
         * generate token
         */
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = generateToken(payload);
        console.log('token', token);

        res.status(200).json({
            token: token,
            response: user
        })
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
})


/** get all person */
router.get('/', jwtAuthMiddleware, async (req, res) => {
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


/**Profile route */
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        //req.user is in jwt token in jwt.js
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findOne({
            _id: userId
        });
        res.status(200).json({
            response: user
        });

    } catch (error) {
        res.status(500).json({
            error: error
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
router.delete('/:id', async (req, res) => {
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