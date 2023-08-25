const fs = require("fs/promises");

const getMonsters = async (req, res) => {
    try {
        const monsters = JSON.parse(
            await fs.readFile("./src/database/monsters.json")
        );

        return res.status(200).json(monsters);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = getMonsters;
