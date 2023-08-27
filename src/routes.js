const express = require("express");
const addMonster = require("./controllers/addMonster");
const getMonsters = require("./controllers/getMonsters");
const getMonstersByName = require("./controllers/getMonstersByName");
const getMonstersByType = require("./controllers/getMonsterByType");
const getMonstersByChallengeLevel = require("./controllers/getMonstersByChallengeLevel");

const router = express();

router.get("/monsters", getMonsters);
router.get("/monsters/name", getMonstersByName);
router.get("/monsters/type", getMonstersByType);
router.get("/monsters/challengeLevel", getMonstersByChallengeLevel);
router.post("/monsters", addMonster);

module.exports = router;
