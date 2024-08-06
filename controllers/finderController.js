// Dependencies
const express = require('express');
const finder = express.Router();

// Queries
const {
    addFishToList,
    removeFromList
} = require('../queries/finderQueries');


finder.post('/',async (req, res) => {
    const fishAddedToList = await addFishToList(req.body);
    if(fishAddedToList.fish_id) {
        res.status(200).json(fishAddedToList);
    } else {
        res.status(400).json({ error: "Fish already in list" })
    }
});

finder.delete('/', async (req, res) => {
    const deletedFish = await removeFromList(req.body);

    if(deletedFish.fish_id) {
        res.status(200).json({message: "Successfully removed"})
    } else {
        res.status(400).json({error: "Fish not found"})
    }
});

module.exports = finder;