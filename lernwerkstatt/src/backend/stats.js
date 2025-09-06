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
            doc = { day: targetDay, minutes: initialMinutes() };
        }

        return res.json(doc);
    } catch (error) {
        console.error('Fehler beim Laden der Stats (POST):', error);
        res.status(500).json({ message: 'Fehler beim Laden der Stats', error: error.message });
    }
});

// Neuer Endpunkt für verschiedene Zeiträume
router.post('/timerange', async (req, res) => {
    try {
        await client.connect();
        const { date, hours = 24 } = req.body;
        
        let targetDay;
        if (typeof date === 'string' && date.trim()) {
            const [year, month, day] = date.split('-');
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
            doc = { day: targetDay, minutes: initialMinutes() };
        }

        // Gruppiere Minuten in den gewünschten Zeiträumen
        const groupedData = groupMinutesByTimeRange(doc.minutes || [], hours);
        
        return res.json({
            day: targetDay,
            timeRange: hours,
            data: groupedData
        });
    } catch (error) {
        console.error('Fehler beim Laden der Timerange-Stats:', error);
        res.status(500).json({ message: 'Fehler beim Laden der Timerange-Stats', error: error.message });
    }
});

// Hilfsfunktion zum Gruppieren der Minuten in Zeiträume
function groupMinutesByTimeRange(minutes, hours) {
    if (hours === 24) {
        // Gruppiere in Stunden (0:00, 1:00, 2:00, etc.)
        const hourlyData = [];
        for (let h = 0; h < 24; h++) {
            const hourMinutes = minutes.filter(m => m.hour === h);
            const totalVisitors = hourMinutes.reduce((sum, m) => sum + m.visitors, 0);
            const totalClicks = hourMinutes.reduce((sum, m) => sum + m.productClicks, 0);
            hourlyData.push({
                time: `${pad2(h)}:00`,
                visitors: totalVisitors,
                productClicks: totalClicks
            });
        }
        return hourlyData;
    } else {
        // Gruppiere in den gewünschten Stunden-Intervallen
        const intervals = [];
        const intervalSize = hours;
        
        for (let i = 0; i < 24; i += intervalSize) {
            const endHour = Math.min(i + intervalSize, 24);
            const intervalMinutes = minutes.filter(m => m.hour >= i && m.hour < endHour);
            const totalVisitors = intervalMinutes.reduce((sum, m) => sum + m.visitors, 0);
            const totalClicks = intervalMinutes.reduce((sum, m) => sum + m.productClicks, 0);
            
            intervals.push({
                time: `${pad2(i)}:00 - ${pad2(endHour)}:00`,
                visitors: totalVisitors,
                productClicks: totalClicks
            });
        }
        return intervals;
    }
}

export default router;