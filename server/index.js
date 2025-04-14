const express = require('express');
const cors = require('cors');
const pool = require("./db");
// console.log('Pool:', typeof pool.query); 
// console.log(pool);

const app = express();
const PORT = 6006;

app.use(cors());
app.use(express.json());






// GET all messages
app.get('/api/messages', async (req, res) => {
  try {
    console.log('Received request to fetch messages');
    const result = await pool.query('SELECT * FROM messages ORDER BY timestamp ASC');
    res.json(result.rows);
    console.log('Fetched messages:', result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST a new message
app.post('/api/messages', async (req, res) => {
    const { sender, content } = req.body;
    console.log('Received request to save message:', { sender, content });
  
    try {
      const result = await pool.query(
        'INSERT INTO messages (sender, content) VALUES ($1, $2) RETURNING *',
        [sender, content]
      );
  
      console.log('Inserted message:', result.rows[0]);
      res.json({ success: true });
    } catch (err) {
      console.error('Error saving message:', err);
      res.status(500).json({ error: 'Failed to save message', details: err.message });
    }
  });
  



app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


