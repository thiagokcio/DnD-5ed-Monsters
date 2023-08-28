const fs = require("fs/promises");
const dataBaseUrl = require("../utils/url");
const getMessage = require("../utils/getMessage");
const { noQueryValue, monsterNotFound } = require("../utils/messages");

const getMonstersByName = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json(getMessage(noQueryValue, "nome"));
    }
    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));

        const monstersByName = monsters.filter((monster) =>
            monster.nome.includes(search.toUpperCase())
        );

        if (monstersByName.length === 0) {
            return res.status(404).json(monsterNotFound);
        }

        return res.status(200).json(monstersByName);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = getMonstersByName;
