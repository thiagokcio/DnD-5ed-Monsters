const fs = require("fs/promises");
const dataBaseUrl = require("../utils/url");
const { monsterNotFound, monsterRemoved } = require("../utils/messages");

const deleteMonster = async (req, res) => {
    const { name } = req.params;

    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));

        const indexMonsterFound = monsters.findIndex(
            (monster) => monster.nome === name.toUpperCase()
        );

        if (indexMonsterFound === -1) {
            return res.status(400).json(monsterNotFound);
        }

        monsters.splice(indexMonsterFound, 1);

        await fs.writeFile(dataBaseUrl, JSON.stringify(monsters));

        res.status(201).json(monsterRemoved);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = deleteMonster;
