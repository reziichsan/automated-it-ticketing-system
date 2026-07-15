require('dotenv').config();
const express = require('express');
const { initDatabase } = require('./config/database');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// PENTING: Tambahkan baris ini agar folder public bisa diakses dari browser!
app.use(express.static('public')); 

// 2. Gunakan routes setelah middleware JSON aktif
app.use('/api', ticketRoutes);

async function startServer() {
    try {
        app.locals.db = await initDatabase();
        
        app.listen(PORT, () => {
            console.log(`📡 Server backend is running perfectly on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start the server environment:', error);
    }
}

startServer();