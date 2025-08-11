import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import { uri } from './dbconnection.js';

const router = express.Router();
const client = new MongoClient(uri);
const db = client.db("NextlvlHardware");
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

router.post('/stats/day', async (req, res) => {
    try {
        await client.connect();
        const { day } = req.body || {};
        const targetDay = typeof day === 'string' && day.trim() ? day.trim() : formatDay(new Date());
        let doc = await stats.findOne({ day: targetDay });
        if (!doc) {
            doc = { day: targetDay, hours: initialHours() };
        }
        return res.json(doc);
    } catch (error) {
        console.error('Fehler beim Laden der Stats (POST):', error);
        res.status(500).json({ message: 'Fehler beim Laden der Stats', error: error.message });
    }
});

export default router;