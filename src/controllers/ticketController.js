const { GoogleGenAI } = require('@google/genai');

// Inisialisasi Gemini Client menggunakan API Key dari file .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function createTicket(req, res) {
    const { title, description } = req.body;
    const db = req.app.locals.db; // Mengambil instance database dari app.js

    // Validasi input dasar
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required!' });
    }

    try {
        // 1. Rancang Prompt Engineering terstruktur untuk Gemini AI
        const prompt = `
            You are an expert IT Helpdesk Triage System. Analyze the following IT complaint ticket.
            
            Ticket Title: "${title}"
            Ticket Description: "${description}"
            
            Classify the ticket into one of these exact categories: [Hardware, Network, Software].
            Determine the priority level based on business impact: [High, Medium, Low].
            
            Provide your answer strictly in the following JSON format. Do not include markdown blocks, do not include backticks, do not include code blocks. Just the raw JSON object string:
            {
                "category": "SelectedCategory",
                "priority": "SelectedPriority"
            }
        `;

        // 2. Kirim prompt ke model Gemini paling mutakhir
        // Pastikan huruf kecil semua dan menggunakan tanda strip, bukan titik
        const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: prompt,
        });

        // 3. Bersihkan dan parsing response teks JSON dari Gemini
        const cleanedText = aiResponse.text.trim();
        const aiResult = JSON.parse(cleanedText);

        // 4. Simpan data tiket orisinal beserta hasil analisis AI ke dalam SQLite database
        const result = await db.run(
            `INSERT INTO tickets (title, description, category, priority) VALUES (?, ?, ?, ?)`,
            [title, description, aiResult.category, aiResult.priority]
        );

        // 5. Kembalikan response sukses ke client/frontend
        res.status(201).json({
            message: 'Ticket created and automatically categorized by AI successfully!',
            ticketId: result.lastID,
            data: {
                title,
                description,
                category: aiResult.category,
                priority: aiResult.priority,
                status: 'Open'
            }
        });

    } catch (error) {
        console.error('❌ Error processing ticket with Gemini AI:', error);
        res.status(500).json({ error: 'Failed to process ticket classification system.' });
    }
}

// Fungsi pelengkap untuk melihat semua tiket yang sudah masuk di database
async function getAllTickets(req, res) {
    const db = req.app.locals.db;
    try {
        const tickets = await db.all(`SELECT * FROM tickets ORDER BY created_at DESC`);
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets database.' });
    }
}

// Fungsi baru untuk memperbarui status tiket
async function updateTicketStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const db = req.app.locals.db;

    const validStatuses = ['Open', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value!' });
    }

    try {
        await db.run(
            `UPDATE tickets SET status = ? WHERE id = ?`,
            [status, id]
        );
        res.json({ message: `Ticket status successfully updated to ${status}.` });
    } catch (error) {
        console.error('❌ Error updating ticket status:', error);
        res.status(500).json({ error: 'Failed to update ticket status.' });
    }
}

// PENTING: Jangan lupa tambahkan updateTicketStatus ke dalam module.exports!
module.exports = { createTicket, getAllTickets, updateTicketStatus };