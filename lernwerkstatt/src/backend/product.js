import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import { uri } from './dbconnection.js';

const router = express.Router();
const client = new MongoClient(uri);
const db = client.db("NextlvlHardware");
const products = db.collection("products");
const stats = db.collection("stats");

function pad2(n){ return n.toString().padStart(2, '0'); }
function formatDay(date){
    const d = new Date(date);
    return `${pad2(d.getDate())}.${pad2(d.getMonth()+1)}.${d.getFullYear()}`;
}
function initialHours(){
    const arr = [];
    for(let h=0; h<24; h++){
        arr.push({ time: `${pad2(h)}:00`, visitors: 0, productClicks: 0 });
    }
    return arr;
}

router.post('/create', async (req, res) => {
    try {
        await client.connect();

        const productData = {
            ...req.body,
            images: req.body.images || [req.body.image],
            mainImage: req.body.mainImage || req.body.image || (req.body.images && req.body.images[0]) || ""
        };

        const result = await products.insertOne(productData);
        
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

router.post('/getproduct', async (req, res) => {
    const { id } = req.body;
    try {
        await client.connect();

        if (!id){
            return res.status(400).json({message: "Produkt ID Fehlt"})
        }

        const product = await products.findOne({ _id: new ObjectId(id) });

        if (!product){
            return res.status(404).json({message: "Kein Produkt gefunden"})
        }

        res.json(product);
    } catch (error) {
        console.error('Fehler beim Abrufen des Produkts:', error);
        res.status(500).json({ message: 'Fehler beim Abrufen des Produkts', error: error.message });
    }
});

// Tracking: Besuch
router.post('/track/visit', async (req, res) => {
    try {
        await client.connect();
        const now = new Date();
        const day = formatDay(now);
        const hourIndex = now.getHours();

        // 1) Stelle sicher, dass das Dokument existiert
        await stats.updateOne(
            { day },
            { $setOnInsert: { day, hours: initialHours() } },
            { upsert: true }
        );
        // 2) Falls vorhandenes Dokument kein 'hours' hat, initialisiere es
        await stats.updateOne(
            { day, hours: { $exists: false } },
            { $set: { hours: initialHours() } }
        );
        // 3) Inkrementiere Besucher der aktuellen Stunde
        await stats.updateOne(
            { day },
            { $inc: { [`hours.${hourIndex}.visitors`]: 1 } }
        );

        return res.json({ ok: true });
    } catch (error) {
        console.error('Fehler beim Besuchs-Tracking:', error);
        res.status(500).json({ message: 'Fehler beim Besuchs-Tracking', error: error.message });
    }
});

// Tracking: Produktklick
router.post('/track/click', async (req, res) => {
    try {
        await client.connect();

        const now = new Date();
        const day = formatDay(now);
        const hourIndex = now.getHours();
        const { productName } = req.body || {};

        await stats.updateOne(
            { day },
            { $setOnInsert: { day, hours: initialHours(), products: {} } },
            { upsert: true }
        );

        await stats.updateOne(
            { day },
            { $inc: { [`hours.${hourIndex}.productClicks`]: 1 } }
        );

        const result = await stats.findOneAndUpdate(
            { day },
            { $inc: { [`products.${productName}`]: 1 } },
            { returnDocument: 'after', upsert: true }
        );


        return res.json({ ok: true });
    } catch (error) {
        console.error('Fehler beim Klick-Tracking:', error);
        res.status(500).json({ message: 'Fehler beim Klick-Tracking', error: error.message });
    }
});

export default router;