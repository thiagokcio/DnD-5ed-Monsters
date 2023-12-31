const fs = require("fs/promises");
const dataBaseUrl = require("../utils/url");
const {
    fieldsRequired,
    monsterAdded,
    existingMonster,
} = require("../utils/messages");

const addMonster = async (req, res) => {
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

        const monsterFound = monsters.find(
            (monster) => monster.nome === nome.toUpperCase()
        );

        if (monsterFound) {
            return res.status(400).json(existingMonster);
        }

        const newMonster = {
            nome: nome.toUpperCase(),
            tipo: tipo.toUpperCase(),
            classe_de_armadura,
            pontos_de_vida: Number(pontos_de_vida),
            nivel_desafio,
        };

        monsters.push(newMonster);

        await fs.writeFile(dataBaseUrl, JSON.stringify(monsters));

        res.status(201).json(monsterAdded);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = addMonster;
