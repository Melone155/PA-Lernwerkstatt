import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import { uri } from './dbconnection.js';

const router = express.Router();
const client = new MongoClient(uri);
const db = client.db("NextlvlHardware");
const products = db.collection("products");

router.post('/', async (req, res) => {

    const {id} = req.body;

    try {

        await client.connect();

        const wishlistItems = await products.find({ _id: { $in: id.map(i => new ObjectId(i)) } }).toArray();
        res.json(wishlistItems);
        
    } catch (error) {
        console.error('Fehler beim Laden der Wishlist (POST):', error);
        res.status(500).json({ message: 'Fehler beim Laden der Wishlist', error: error.message });
    }
});

export default router;