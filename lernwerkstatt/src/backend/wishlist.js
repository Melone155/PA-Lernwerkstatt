import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import { uri } from './dbconnection.js';

const router = express.Router();
const client = new MongoClient(uri);
const db = client.db("NextlvlHardware");
const products = db.collection("products");

router.get('/', async (req, res) => {

    const {id} = req.body;
    

    try {

        const IDs: string[] = saved ? JSON.parse(saved) : [];
        
    } catch (error) {
        console.error('Fehler beim Laden der Wishlist (GET):', error);
        res.status(500).json({ message: 'Fehler beim Laden der Wishlist', error: error.message });
    }
});

export default router;