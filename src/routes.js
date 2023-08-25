const express = require("express");
const addMonster = require("./controllers/addMonster");
const getMonsters = require("./controllers/getMonsters");

const router = express();

router.get("/monsters", getMonsters);

router.post("/monsters", addMonster);

module.exports = router;
