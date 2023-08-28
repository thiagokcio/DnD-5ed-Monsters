const fs = require("fs/promises");
const dataBaseUrl = require("../utils/url");

const getMonsters = async (req, res) => {
    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));
        return res.status(200).json(monsters);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = getMonsters;
