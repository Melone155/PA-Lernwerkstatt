import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import { uri } from './dbconnection.js';

const router = express.Router();
const client = new MongoClient(uri);
const db = client.db("NextlvlHardware");
const products = db.collection("products");

// POST - Neues Produkt erstellen
router.post('/create', async (req, res) => {
    try {
        await client.connect();

        const result = await products.insertOne(req.body);
        
        res.status(201).json({
            message: 'Produkt erfolgreich erstellt',
        });
    } catch (error) {
        console.error('Fehler beim Erstellen des Produkts:', error);
        res.status(500).json({ 
            message: 'Fehler beim Erstellen des Produkts', 
            error: error.message 
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        await client.connect();
        const allProducts = await products.find({}).toArray();
        res.json(allProducts);
    } catch (error) {
        console.error('Fehler beim Abrufen der Produkte:', error);
        res.status(500).json({
            message: 'Fehler beim Abrufen der Produkte',
            error: error.message
        });
    }
});

export default router;