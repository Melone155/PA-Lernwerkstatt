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
function initialMinutes(){
    const arr = [];
    for(let h=0; h<24; h++){
        for(let m=0; m<60; m++){
            arr.push({ 
                time: `${pad2(h)}:${pad2(m)}`, 
                hour: h,
                minute: m,
                visitors: 0, 
                productClicks: 0 
            });
        }
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

router.get('/randomproducts', async (req, res) => {
    try {
        await client.connect();
        const { limit = 4 } = req.query;
        
        // Aggregation Pipeline für zufällige Produkte
        const randomProducts = await products.aggregate([
            { $sample: { size: parseInt(limit) } }
        ]).toArray();
        
        res.json(randomProducts);
    } catch (error) {
        console.error('Fehler beim Abrufen zufälliger Produkte:', error);
        res.status(500).json({
            message: 'Fehler beim Abrufen zufälliger Produkte',
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
        const hour = now.getHours();
        const minute = now.getMinutes();
        const minuteIndex = hour * 60 + minute;

        // 1) Stelle sicher, dass das Dokument existiert
        await stats.updateOne(
            { day },
            { $setOnInsert: { day, minutes: initialMinutes() } },
            { upsert: true }
        );
        // 2) Falls vorhandenes Dokument kein 'minutes' hat, initialisiere es
        await stats.updateOne(
            { day, minutes: { $exists: false } },
            { $set: { minutes: initialMinutes() } }
        );
        // 3) Inkrementiere Besucher der aktuellen Minute
        await stats.updateOne(
            { day },
            { $inc: { [`minutes.${minuteIndex}.visitors`]: 1 } }
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
        const hour = now.getHours();
        const minute = now.getMinutes();
        const minuteIndex = hour * 60 + minute;
        const { productName } = req.body || {};

        await stats.updateOne(
            { day },
            { $setOnInsert: { day, minutes: initialMinutes(), products: {} } },
            { upsert: true }
        );

        await stats.updateOne(
            { day },
            { $inc: { [`minutes.${minuteIndex}.productClicks`]: 1 } }
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

router.post("/similar", async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: "Produkt-ID fehlt." });
        }

        await client.connect();

        const mainProduct = await products.findOne({ _id: new ObjectId(id) });

        if (!mainProduct) {
            return res.status(404).json({ message: "Produkt nicht gefunden." });
        }

        const { category } = mainProduct;

        if (!Array.isArray(category) || category.length === 0) {
            return res
                .status(400)
                .json({ message: "Dieses Produkt hat keine Kategorien." });
        }

        const similarProducts = await products
            .find({
                _id: { $ne: new ObjectId(id) },
                category: { $in: category }
            })
            .limit(10) // z. B. auf 10 begrenzen
            .toArray();

        // 4️⃣ Ergebnis zurückgeben
        res.status(200).json(similarProducts);
    } catch (error) {
        console.error("Fehler beim Laden ähnlicher Produkte:", error);
        res
            .status(500)
            .json({ message: "Fehler beim Laden ähnlicher Produkte", error: error.message });
    } finally {
        await client.close();
    }
});

export default router;