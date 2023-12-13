const LivresModel = require('../Model/LivresModel');

const getAllLivres = async (req, res) => {
    try {
        const result = await LivresModel.findAll();
        res.json(result.docs);
    } catch (error) {
        res.status(500).json({ error: 'erreur get' });
    }
};

const getLivreByNumber = async (req, res) => {
    const numero = Number(req.params.numlivre);
    try {
        const result = await LivresModel.findByNumber(numero);
        if (result.docs.length > 0) {
            res.json(result.docs[0]);
        } else {
            res.status(404).json({ error: "Livre non trouvé" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erreur get" });
    }
};

const obtenirPagesLivre = async (req, res) => {
    const numero = Number(req.params.numlivre);
    try {
        const result = await LivresModel.trouverPagesParNumero(numero);
        if (result.docs.length > 0) {
            const pages = result.docs[0].pages || [];
            res.json({ pages });
        } else {
            res.status(404).json({ message: "Ce livre n'existe pas", etat: 404 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erreur get' });
    }
};


const obtenirContenuPage = async (req, res) => {
    const numero = Number(req.params.numlivre);
    const numpage = Number(req.params.numpage);

    try {
        const contenuPage = await LivresModel.trouverContenuPage(numero, numpage);
        if (contenuPage === null) {
            res.status(404).json({ message: "Ce livre n'existe pas", etat: 404 });
        } else if (contenuPage === 'inexistant') {
            res.status(404).json({ message: "page nonn existante", etat: 404 });
        } else {
            res.json({ Page: numpage, Contenu: contenuPage });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erreur get' });
    }
};


const creerLivre = async (req, res) => {
    try {
        const livre = req.body;
        const response = await LivresModel.insererLivre(livre);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "livre non post" });
    }
};

const mettreAJourLivre = async (req, res) => {
    const { numero, nouveauTitre } = req.body;

    try {
        const updateResult = await LivresModel.mettreAJourLivre(numero, nouveauTitre);

        if (!updateResult) {
            return res.status(404).json({ error: "livre non trouvé" });
        }

        res.json(updateResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erreur maj" });
    }
};

const supprimerLivre = async (req, res) => {
    const numero = Number(req.params.numlivre);

    try {
        const deleteResult = await LivresModel.supprimerLivre(numero);

        if (!deleteResult) {
            return res.status(404).json({ error: "livre non trouvé" });
        }

        res.json(deleteResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erreur suppression" });
    }
};

module.exports = { getAllLivres, getLivreByNumber, obtenirPagesLivre, obtenirContenuPage, creerLivre, mettreAJourLivre, supprimerLivre };