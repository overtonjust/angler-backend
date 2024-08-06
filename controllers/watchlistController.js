// Dependencies
const express = require('express');
const watchlists = express.Router();

// Queries
const {
    viewAllWatchlists,
    getOneWatchlist,
    viewWatchlistDetails,
    editWatchlist,
    createWatchlist,
    deleteWatchlist
} = require('../queries/watchlistQueries');


watchlists.get('/', async (req, res) => {
    const userId = req.session.user.id;
    const watchlists = await viewAllWatchlists(userId);

    res.status(200).json(watchlists)
});

watchlists.get('/:id', async (req, res) => {
    const { id } = req.params;
    const watchlistFound = await getOneWatchlist(id);
    const fish = await viewWatchlistDetails(id);
    console.log(id, watchlistFound, fish)

    if(fish[0]){
        res.status(200).json({...watchlistFound, fish})
    } else {
        res.status(400).json({error: "Watchlist not found"})
    }
});

watchlists.post('/', async (req, res) => {
    const userId = req.session.user.id;
    const newWatchlist = await createWatchlist(req.body, userId);

    if(newWatchlist.id) {
        res.status(200).json({message: "Watchlist added"})
    } else {
        res.status(400).json({message: "Something went wrong watchlist not added"})
    }
});

watchlists.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedWatchlist = await editWatchlist({...req.body, id});

    if(updatedWatchlist.id) {
        res.status(200).json(updatedWatchlist)
    } else {
        res.status(404).json({ error: "Watchlist not found"})
    }
});

watchlists.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedWatchlist =  await deleteWatchlist(id);

    if(deletedWatchlist.id) {
        res.status(200).json({message: "Watchlist removed"})
    } else {
        res.status(404).json({error: "Watchlist not found"})
    }
});

module.exports = watchlists;