const express = require("express");
const addMonster = require("./controllers/addMonster");
const getMonsters = require("./controllers/getMonsters");
const getMonstersByName = require("./controllers/getMonstersByName");

const router = express();

router.get("/monsters", getMonsters);
router.get("/monsters/name", getMonstersByName);
router.post("/monsters", addMonster);

module.exports = router;
