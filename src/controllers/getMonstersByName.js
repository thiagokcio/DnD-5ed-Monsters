const fs = require("fs/promises");

const getMonstersByName = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({
            mensagem: "Informe um nome para busca.",
        });
    }
    try {
        const monsters = JSON.parse(
            await fs.readFile("./src/database/monsters.json")
        );

        const monstersByName = monsters.filter((monster) =>
            monster.nome.includes(search.toUpperCase())
        );

        return res.status(200).json(monstersByName);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = getMonstersByName;
