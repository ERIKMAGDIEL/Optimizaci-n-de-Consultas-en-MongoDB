const express = require("express");
const router = express.Router();
const productsControlle = require("../controller/productsController");


router.get("/consulta1", productsControlle.consulta1);
router.get("/consulta2", productsControlle.consulta2);
router.get("/consulta3", productsControlle.consulta3);
router.post("/createIndexes", productsControlle.createIndexes);


module.exports = router;