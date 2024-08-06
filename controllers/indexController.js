// Dependencies
const express = require('express');
const index = express.Router();

// Queries
const {
    viewAllFish, 
    viewOneFish
} = require('../queries/indexQueries');

index.get('/', async (req, res) => {
    const fishList = await viewAllFish();
    if(fishList[0]) {
        res.status(200).json(fishList)
    } else {
        res.status(500).json({error: "Server error"})
    }
});

index.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundFish = await viewOneFish(id);

    if(foundFish.id) {
        res.status(200).json(foundFish)
    } else {
        res.status(404).json({error: "Fish not found"})
    }
});



module.exports = index;