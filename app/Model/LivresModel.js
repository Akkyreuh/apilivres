const nano = require('nano')('http://akkyreuh:toto12@127.0.0.1:5984');
const livresDB = nano.use('livres');

const findAll = async () => {
    const query = {
        "selector": {},
        "fields": ["titre", "numero", "pages", "resume"]
    };

    return await livresDB.find(query);
};

const findByNumber = async (numero) => {
    const query = {
        "selector": { "numero": numero },
        "fields": ["_id", "_rev", "titre", "numero", "pages", "resume"]
    };

    return await livresDB.find(query);
};

const trouverPagesParNumero = async (numero) => {
    const query = {
        "selector": { "numero": numero },
        "fields": ["pages"]
    };

    return await livresDB.find(query);
};

const trouverContenuPage = async (numero, numpage) => {
    const query = {
        "selector": { "numero": numero },
        "fields": ["pages"]
    };

    const result = await livresDB.find(query);
    if (result.docs.length === 0) {
        return null;
    } else {
        const livre = result.docs[0];
        if (numpage >= 1 && numpage <= livre.pages.length) {
            return livre.pages[numpage - 1]; 
        } else {
            return 'inexistant';
        }
    }
};

const insererLivre = async (livre) => {
    return await livresDB.insert(livre);
};

const mettreAJourLivre = async (numero, nouveauTitre) => {
    const findResult = await livresDB.find({ "selector": { "numero": numero } });
    
    if (findResult.docs.length === 0) {
        return null;
    }

    const livre = findResult.docs[0];
    livre.titre = nouveauTitre;

    return await livresDB.insert(livre); 
};


const supprimerLivre = async (numero) => {
    const findResult = await livresDB.find({ "selector": { "numero": numero } });

    if (findResult.docs.length === 0) {
        return null; 
    }

    const livre = findResult.docs[0];
    return await livresDB.destroy(livre._id, livre._rev); 
};


module.exports = { findAll, findByNumber, trouverPagesParNumero, trouverContenuPage, insererLivre, mettreAJourLivre, supprimerLivre };