import { deleteAllLinks, getLinks } from "../Controllers/Links.js";
import { startBot, stopBot, isBotRunning } from "../Bot.js";
import express from 'express';

const router = express.Router();

// GET tutti i links
router.get('/', getLinks);

// POST - Avvia il bot
router.post("/start-bot", async (req, res) => {
  try {
    if (isBotRunning()) {
      return res.json({ 
        message: "Bot già in esecuzione",
        botStatus: true
      });
    }

    await startBot();
    console.log('✅ Bot avviato via API');
    
    res.json({ 
      message: "Bot avviato con successo",
      botStatus: true
    });
  } catch (error) {
    console.error('❌ Errore avvio bot:', error);
    res.status(500).json({ 
      message: "Errore durante l'avvio del bot",
      error: error.message,
      botStatus: false
    });
  }
});

// POST - Ferma il bot
router.post("/stop-bot", async (req, res) => {
  try {
    await stopBot();
    console.log('⛔ Bot fermato via API');
    
    res.json({ 
      message: "Bot fermato con successo",
      botStatus: false
    });
  } catch (error) {
    console.error('❌ Errore stop bot:', error);
    res.status(500).json({ 
      message: "Errore durante l'arresto del bot",
      error: error.message
    });
  }
});

// GET - Stato del bot (NON fa più fetch a localhost:3001!)
router.get('/bot-status', (req, res) => {
  try {
    const botStatus = isBotRunning();
    
    console.log(`📊 Bot status richiesto: ${botStatus}`);
    
    res.json({ 
      botStatus: botStatus
    });
  } catch (error) {
    console.error("❌ Errore nel recuperare lo stato del bot:", error);
    res.json({ 
      botStatus: false,
      error: error.message
    });
  }
});

// DELETE - Cancella tutti i links
router.delete('/delete-all-links', deleteAllLinks);

export default router;