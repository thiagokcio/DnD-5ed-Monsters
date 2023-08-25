const fs = require("fs/promises");

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
        return res.status(400).json("Todos os campos são obrigatórios.");
    }

    try {
        const monsters = JSON.parse(
            await fs.readFile("./src/database/monsters.json")
        );

        const monsterFound = monsters.find(
            (monster) => monster.nome === nome.toUpperCase()
        );

        if (monsterFound) {
            return res
                .status(400)
                .json("Ja existe um monstro cadastrado com esse nome.");
        }

        const newMonster = {
            nome: nome.toUpperCase(),
            tipo: tipo.toUpperCase(),
            classe_de_armadura,
            pontos_de_vida: Number(pontos_de_vida),
            nivel_desafio,
        };

        monsters.push(newMonster);

        await fs.writeFile(
            "./src/database/monsters.json",
            JSON.stringify(monsters)
        );

        res.status(201).json("Monstro adicionado com sucesso!");
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = addMonster;
