const express = require("express");
const addMonster = require("./controllers/addMonster");
const getMonsters = require("./controllers/getMonsters");
const getMonstersByName = require("./controllers/getMonstersByName");
const getMonstersByType = require("./controllers/getMonsterByType");
const getMonstersByChallengeLevel = require("./controllers/getMonstersByChallengeLevel");
const updateMonster = require("./controllers/updateMonster");
const deleteMonster = require("./controllers/deleteMonster");

const router = express();

router.get("/monsters", getMonsters);
router.get("/monsters/name", getMonstersByName);
router.get("/monsters/type", getMonstersByType);
router.get("/monsters/challengeLevel", getMonstersByChallengeLevel);
router.post("/monsters", addMonster);
router.put("/monsters/:name", updateMonster);
router.delete("/monsters/:name", deleteMonster);

module.exports = router;
