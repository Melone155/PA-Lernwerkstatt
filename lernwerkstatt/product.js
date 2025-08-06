const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Verbindung
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// POST - Neues Produkt erstellen
app.post('/product/create', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const productData = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await products.insertOne(productData);
        
        res.status(201).json({
            message: 'Produkt erfolgreich erstellt',
            productId: result.insertedId,
            product: productData
        });
    } catch (error) {
        console.error('Fehler beim Erstellen des Produkts:', error);
        res.status(500).json({ 
            message: 'Fehler beim Erstellen des Produkts', 
            error: error.message 
        });
    }
});

// GET - Alle Produkte abrufen
app.get('/products', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

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

// GET - Einzelnes Produkt abrufen
app.get('/product/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const { ObjectId } = require('mongodb');
        const product = await products.findOne({ _id: new ObjectId(req.params.id) });
        
        if (!product) {
            return res.status(404).json({ message: 'Produkt nicht gefunden' });
        }
        
        res.json(product);
    } catch (error) {
        console.error('Fehler beim Abrufen des Produkts:', error);
        res.status(500).json({ 
            message: 'Fehler beim Abrufen des Produkts', 
            error: error.message 
        });
    }
});

// PUT - Produkt aktualisieren
app.put('/product/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const { ObjectId } = require('mongodb');
        const productData = {
            ...req.body,
            updatedAt: new Date()
        };

        const result = await products.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: productData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Produkt nicht gefunden' });
        }

        res.json({ 
            message: 'Produkt erfolgreich aktualisiert',
            product: productData
        });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Produkts:', error);
        res.status(500).json({ 
            message: 'Fehler beim Aktualisieren des Produkts', 
            error: error.message 
        });
    }
});

// DELETE - Produkt löschen
app.delete('/product/:id', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const { ObjectId } = require('mongodb');
        const result = await products.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Produkt nicht gefunden' });
        }

        res.json({ message: 'Produkt erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Produkts:', error);
        res.status(500).json({ 
            message: 'Fehler beim Löschen des Produkts', 
            error: error.message 
        });
    }
});

// GET - Produkte nach Kategorie
app.get('/products/category/:category', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const categoryProducts = await products.find({ 
            category: req.params.category 
        }).toArray();
        
        res.json(categoryProducts);
    } catch (error) {
        console.error('Fehler beim Abrufen der Produkte nach Kategorie:', error);
        res.status(500).json({ 
            message: 'Fehler beim Abrufen der Produkte', 
            error: error.message 
        });
    }
});

// GET - Produkte suchen
app.get('/products/search/:query', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const searchQuery = req.params.query;
        const searchResults = await products.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ]
        }).toArray();
        
        res.json(searchResults);
    } catch (error) {
        console.error('Fehler bei der Produktsuche:', error);
        res.status(500).json({ 
            message: 'Fehler bei der Produktsuche', 
            error: error.message 
        });
    }
});

// GET - Alle Kategorien abrufen
app.get('/categories', async (req, res) => {
    try {
        await client.connect();
        const db = client.db("NextlvlHardware");
        const products = db.collection("products");

        const categories = await products.distinct('category');
        res.json(categories);
    } catch (error) {
        console.error('Fehler beim Abrufen der Kategorien:', error);
        res.status(500).json({ 
            message: 'Fehler beim Abrufen der Kategorien', 
            error: error.message 
        });
    }
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Etwas ist schief gelaufen!' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route nicht gefunden' });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

module.exports = app; 