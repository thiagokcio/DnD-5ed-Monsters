const fs = require("fs/promises");
const getMessage = require("../utils/getMessage");
const { noQueryValue, monsterNotFound } = require("../utils/messages");
const dataBaseUrl = require("../utils/url");

const getMonstersByChallengeLevel = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res
            .status(400)
            .json(getMessage(noQueryValue, "nível de desafio"));
    }

    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));

        const monstersByChallengeLevel = monsters.filter(
            (monster) => monster.nivel_desafio === search
        );

        if (monstersByChallengeLevel.length === 0) {
            return res.status(404).json(monsterNotFound);
        }

        return res.status(200).json(monstersByChallengeLevel);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = getMonstersByChallengeLevel;
