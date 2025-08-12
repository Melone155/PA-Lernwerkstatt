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
router.post('/day', async (req, res) => {
    try {
        await client.connect();

        const dateString = req.body?.Date;
        let targetDay;

        if (typeof dateString === 'string' && dateString.trim()) {
            const [year, month, day] = dateString.split('-');
            targetDay = `${day}.${month}.${year}`;
        } else {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            targetDay = `${day}.${month}.${year}`;
        }

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