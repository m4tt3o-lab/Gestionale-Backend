import { deleteAllLinks, getLinks } from "../Controllers/Links.js";
import { startBot, stopBot } from "../Bot.js";
import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();


router.get('/', getLinks);

// === ENDPOINTS EXPRESS ===
router.post("/start-bot", (req, res) => {
  startBot();
  res.json({ message: "Bot avviato." });
});

router.post("/stop-bot", async (req, res) => {
  await stopBot();
  res.json({ message: "Bot fermato." });
});


router.get('/bot-status', async (req, res) => {
  try {
    const response = await fetch(process.env.BOT_API_URL);  
    const data = await response.json();  
    res.json(data);  
  } catch (error) {
    console.error("Errore nel recuperare lo stato del bot:", error);
    res.json({ botStatus: false });
  }
});





router.delete('/delete-all-links', deleteAllLinks)

export default router;
