const watchlists = require('../controllers/watchlistController');
const { db } = require('../db/dbconfig');

const viewAllWatchlists = async (userId) => {
    try {
        const watchlists =  await db.any("SELECT watchlists.id, name, description, is_favorite FROM watchlists JOIN users ON users.id = watchlists.user_id AND users.id = $1", userId);
        return watchlists;
    } catch (error) {
        return error;
    }
};

const getOneWatchlist = async (watchlistId) => {
    try {
        const watchlistFound = await db.one("SELECT watchlists.id, name, description, is_favorite FROM watchlists WHERE id = $1",watchlistId);
        return watchlistFound;
    } catch (error) {
        return error;
    }
};

const viewWatchlistDetails = async (watchlistId) => {
    try {
        const watchlistInfo = await db.any("SELECT fish.id, fish.name, fish.image, fish.icon, fish.bait, fish.scrip_type, fish.region, fish.area, fish.time_window, fish.weather_found, fish.closest_aetheryte  FROM fish_finder JOIN watchlists ON watchlists.id = fish_finder.watchlist_id AND watchlists.id = $1 JOIN fish ON fish.id = fish_finder.fish_id", watchlistId);
        return watchlistInfo;
    } catch (error) {
        return error;
    }
};

const createWatchlist = async (watchlist, userId) => {
    try {
        const newWatchlist = await db.one("INSERT INTO watchlists (name, description, is_favorite, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [
             watchlist.name,
             watchlist.description,
             watchlist.is_favorite,
             userId
            ]);
        return newWatchlist;      
    } catch (error) {
        return error;
    }
};

const editWatchlist = async (watchlist) => {
    try {
        const updatedWatchlist = await db.one("UPDATE watchlists set name = $1, description = $2, is_favorite = $3 WHERE id = $4 RETURNING *", [
            watchlist.name,
            watchlist.description,
            watchlist.is_favorite,
            watchlist.id
        ]);
        return updatedWatchlist;
    } catch (error) {
        return error;
    }
};

const deleteWatchlist = async (watchlistId) => {
    try {
        const deletedWatchlist=  await db.one("DELETE FROM watchlists WHERE id = $1 RETURNING *", watchlistId);
        return deletedWatchlist;
    } catch (error) {
        return error;
    }
};

module.exports = { viewAllWatchlists, getOneWatchlist, viewWatchlistDetails, editWatchlist, createWatchlist, deleteWatchlist };