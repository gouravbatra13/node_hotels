const express = require('express');
const router = express.Router();

/**import model */
const Menu = require('../models/MenuItems.js');



/** Add menu  */
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const NewMenu = new Menu(data);
        const save = await NewMenu.save();
        res.status(200).json(save);
    } catch (error) {
        res.status(500).json(error);
    }
})



/** get menu */
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

/**
 * search menu
 */
router.get('/:taste', async (req, res) => {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
        try {
            const data = await Menu.find({
                taste: taste
            });
            res.status(200).json({
                data
            });
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    } else {
        res.status(404).json({
            error: "Invalid type"
        })
    }
})
module.exports = router;