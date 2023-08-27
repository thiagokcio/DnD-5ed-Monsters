const fs = require("fs/promises");

const getMonstersByChallengeLevel = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({
            mensagem: "Informe um tipo para busca.",
        });
    }

    try {
        const monsters = JSON.parse(
            await fs.readFile("./src/database/monsters.json")
        );

        const monstersByChallengeLevel = monsters.filter(
            (monster) => monster.nivel_desafio === search
        );

        if (monstersByChallengeLevel.length === 0) {
            return res.status(404).json({
                mensagem: "Nenhum monstro encontrado.",
            });
        }

        return res.status(200).json(monstersByChallengeLevel);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = getMonstersByChallengeLevel;
