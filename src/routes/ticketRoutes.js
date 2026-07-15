const express = require('express');
const router = express.Router();
// 1. Impor fungsi updateTicketStatus
const { createTicket, getAllTickets, updateTicketStatus } = require('../controllers/ticketController');

router.post('/tickets', createTicket);
router.get('/tickets', getAllTickets);

// 2. Tambahkan route PATCH/PUT dengan parameter ID tiket
router.put('/tickets/:id/status', updateTicketStatus);

module.exports = router;