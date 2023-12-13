const express = require('express');
const router = express.Router();
const LivresController = require('../Controller/LivresController');

router.get('/livres', LivresController.getAllLivres);

router.get("/livres/:numlivre", LivresController.getLivreByNumber);

router.get("/livres/:numlivre/pages", LivresController.obtenirPagesLivre);

router.get("/livres/:numlivre/pages/:numpage", LivresController.obtenirContenuPage);

router.post("/livres", LivresController.creerLivre);

router.put("/livres", LivresController.mettreAJourLivre);

router.delete("/livres/:numlivre", LivresController.supprimerLivre);

module.exports = router;