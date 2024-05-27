// Importez express et créez un routeur
const express = require('express');
const router = express.Router();

// Importez le modèle de catégorie
const Categorie = require('../models/categorie');

// Importez le middleware d'authentification
const auth = require('../middleware/auth');

// Affichez la liste des catégories avec authentification
router.get('/', auth, async (req, res) => {
    try {
        // Récupérez la liste des catégories depuis la base de données
        const categories = await Categorie.find({}, null, { sort: { '_id': -1 } });

        // Renvoyez la liste des catégories au format JSON
        res.status(200).json(categories);
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Créez une nouvelle catégorie
router.post('/', async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body;
    const newCategorie = new Categorie({ nomcategorie: nomcategorie, imagecategorie: imagecategorie });
    try {
        // Sauvegardez la nouvelle catégorie dans la base de données
        await newCategorie.save();
        // Renvoyez la nouvelle catégorie au format JSON
        res.status(200).json(newCategorie);
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Recherchez une catégorie par ID
router.get('/:categorieId', async (req, res) => {
    try {
        // Recherchez la catégorie par ID dans la base de données
        const cat = await Categorie.findById(req.params.categorieId);
        // Renvoyez la catégorie trouvée au format JSON
        res.status(200).json(cat);
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Modifiez une catégorie
router.put('/:categorieId', async (req, res) => {
    try {
        // Mettez à jour la catégorie dans la base de données
        const cat1 = await Categorie.findByIdAndUpdate(req.params.categorieId, { $set: req.body }, { new: true });
        // Renvoyez la catégorie mise à jour au format JSON
        res.status(200).json(cat1);
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Supprimez une catégorie
router.delete('/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    try {
        // Supprimez la catégorie de la base de données
        await Categorie.findByIdAndDelete(id);
        // Renvoyez un message de succès
        res.json({ message: "Categorie deleted successfully." });
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Cherchez une sous-catégorie par catégorie
router.get('/cat/:categorieID', async (req, res) => {
    try {
        // Recherchez les sous-catégories pour une catégorie donnée dans la base de données
        const scat = await SCategorie.find({ categorieID: req.params.categorieID }).exec();
        // Renvoyez les sous-catégories trouvées au format JSON
        res.status(200).json(scat);
    } catch (error) {
        // Gérez les erreurs
        res.status(404).json({ message: error.message });
    }
});

// Exportez le routeur
module.exports = router;
