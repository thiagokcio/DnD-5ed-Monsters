const fs = require("fs/promises");
const getMessage = require("../utils/getMessage");
const { monsterNotFound, noQueryValue } = require("../utils/messages");
const dataBaseUrl = require("../utils/url");

const getMonstersByType = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json(getMessage(noQueryValue, "tipo"));
    }

    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));

        const monstersByType = monsters.filter(
            (monster) => monster.tipo === search.toUpperCase()
        );

        if (monstersByType.length === 0) {
            return res.status(404).json(monsterNotFound);
        }

        return res.status(200).json(monstersByType);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = getMonstersByType;
