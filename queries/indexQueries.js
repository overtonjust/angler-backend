// Dependencies
const  { db } = require('../db/dbconfig');

const viewAllFish = async () => {
    try {
        const fishList = await db.any("SELECT * FROM fish");
        return fishList;       
    } catch (error) {
        return error;
    }
};

const viewOneFish = async (id) => {
    try {
        const foundFish = await db.one("SELECT * FROM fish WHERE id=$1",id);
        return foundFish;
    } catch (error) {
        return error;
    }
};

module.exports = { viewAllFish, viewOneFish };