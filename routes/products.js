var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");


/* GET users listing. */
router.get('/', productsController.mostrarProductos);

router.get("/create", productsController.mostrarCreate)
router.post("/create", productsController.create)

router.get("/edit/:id", productsController.mostrarEdit)
router.post("/edit/:id", productsController.edit)

router.get("/delete/:id", productsController.delete);

module.exports = router;
