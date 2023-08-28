const fs = require("fs/promises");
const dataBaseUrl = require("../utils/url");
const {
    fieldsRequired,
    monsterNotFound,
    monsterUpdated,
    noQueryValue,
} = require("../utils/messages");
const getMessage = require("../utils/getMessage");

const updateMonster = async (req, res) => {
    const { name } = req.params;
    const { nome, tipo, classe_de_armadura, pontos_de_vida, nivel_desafio } =
        req.body;

    if (
        !nome ||
        !tipo ||
        !classe_de_armadura ||
        !pontos_de_vida ||
        !nivel_desafio
    ) {
        return res.status(400).json(fieldsRequired);
    }

    try {
        const monsters = JSON.parse(await fs.readFile(dataBaseUrl));

        const indexMonsterFound = monsters.findIndex(
            (monster) => monster.nome === name.toUpperCase()
        );

        if (indexMonsterFound === -1) {
            return res.status(400).json(monsterNotFound);
        }

        monsters[indexMonsterFound] = {
            nome: nome.toUpperCase(),
            tipo: tipo.toUpperCase(),
            classe_de_armadura,
            pontos_de_vida: Number(pontos_de_vida),
            nivel_desafio,
        };

        await fs.writeFile(dataBaseUrl, JSON.stringify(monsters));

        res.status(201).json(monsterUpdated);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = updateMonster;
