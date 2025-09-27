import express from "express";
import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import Link from './Models/Links.js';

dotenv.config();
const app = express();
app.use(express.json());

let client = null; // mantiene il bot attuale
let isBotRunning = false;

// === AVVIA IL BOT ===
export const startBot = () => {
  if (isBotRunning) {
    console.log("⚠️ Il bot è già attivo.");
    return;
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    console.log(`✅ Bot connesso come ${client.user.tag}`);
    isBotRunning = true;
  });



  client.on("messageCreate", async (message) => {
    if (message.embeds.length > 0) {
      console.log("Embed trovato!");
      for (const embed of message.embeds) {
        const fields = embed.fields || [];

        for (const field of fields) {
          const match = field.value.match(/\[Click here\]\((https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+)\)/);
          if (match) {
            const link = match[1];
            console.log(`🔗 Link estratto: ${link}`);
            try {
              const newLink = await Link.create({ Url: link });
              console.log("✅ Link salvato:", newLink.Url);
            } catch (error) {
              console.error("❌ Errore salvataggio link:", error.message);
            }
          }
        }
      }
    }
  });

  client.login(process.env.TOKEN).catch((err) => {
    console.error("❌ Errore di login:", err);
    isBotRunning = false;
  });
};

  app.get('/bot-status', (req, res) => {
  try {
    // Verifica se il bot è pronto
    const botStatus = client.isReady(); 
    // Restituisce direttamente lo stato del bot come oggetto
    res.json({ botStatus });  
  } catch (error) {
    console.error("Errore nel recuperare lo stato del bot:", error);
    res.json({ botStatus: false });
  }
});

// === FERMA IL BOT ===
export const stopBot = async () => {
  if (client && isBotRunning) {
    await client.destroy();
    console.log("🛑 Bot disconnesso.");
    isBotRunning = false;
    client = null;
  } else {
    console.log("⚠️ Nessun bot attivo da fermare.");
  }
};


app.listen(process.env.BOT_PORT, () => {
  console.log(`🚀 ServerBot avviato sulla porta ${process.env.BOT_PORT}`);
});
