import cors from 'cors';
import express from "express";
import { connectDB } from "./dbconnection.js";
import product from './product.js';
import stats from "./stats.js";
import  wishlist from "./wishlist.js"

const app = express();
const PORT = 5000;


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','DELETE', 'PATCH', 'PUT'],
    allowedHeaders: '*',
};

app.use(cors())

app.use(express.json());

app.listen(PORT, "localhost", () => {
    console.log("Server läuft auf http://192.168.254.12:5000");
});

await connectDB();

app.use('/product', product);
app.use('/stats', stats);
app.use('/wishlist', wishlist);

