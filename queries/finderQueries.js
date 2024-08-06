// Dependencies
const { db } = require('../db/dbconfig');

const addFishToList = async (lookup) => {
    try {
        const addedFish = await db.one("INSERT INTO fish_finder (watchlist_id, fish_id) VALUES ($1, $2) RETURNING *", 
            [
                lookup.watchlist_id,
                lookup.fish_id
            ]
        );
        return addedFish;
    } catch (error) {
        return error;
    }
};

const removeFromList = async (lookup) => {
    try {
        const deletedFish = await db.one("DELETE FROM WHERE watchlist_id = $1 AND fish_id = $2 RETURNING *", 
            [
                lookup.watchlist_id,
                lookup.fish_id
            ]
        )
    } catch (error) {
        return error;
    }
}


module.exports = { addFishToList, removeFromList }