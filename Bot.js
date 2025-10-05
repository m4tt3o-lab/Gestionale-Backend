import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import Link from './Models/Links.js'; // IMPORTANTE: usa il path corretto

dotenv.config();

let client = null;
let isRunning = false;

// Funzione per verificare se il bot è in esecuzione
export function isBotRunning() {
  return isRunning && client !== null && client.isReady();
}

// Funzione per avviare il bot
export const startBot = async () => {
  if (isRunning) {
    console.log("⚠️ Il bot è già attivo.");
    return;
  }

  try {
    console.log("🤖 Avvio del bot Discord...");

    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    client.once("ready", () => {
      console.log(`✅ Bot connesso come ${client.user.tag}`);
      isRunning = true;
    });

    // Gestione messaggi con embed
    client.on("messageCreate", async (message) => {
      if (message.embeds.length > 0) {
        console.log("📩 Embed trovato!");
        
        for (const embed of message.embeds) {
          const fields = embed.fields || [];

          for (const field of fields) {
            // Regex per estrarre link Discord
            const match = field.value.match(/\[Click here\]\((https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+)\)/);
            
            if (match) {
              const link = match[1];
              console.log(`🔗 Link estratto: ${link}`);
              
              try {
                await Link.create({ Url: link });
                console.log("✅ Link salvato nel database");
              } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                  console.log("⚠️  Link già esistente, saltato");
                } else {
                  console.error("❌ Errore salvataggio link:", error.message);
                }
              }
            }
          }
        }
      }
    });

    // Gestione errori
    client.on("error", (error) => {
      console.error("❌ Errore Discord bot:", error);
    });

    client.on("disconnect", () => {
      console.log("⚠️  Bot disconnesso");
      isRunning = false;
    });

    // Login
    const token =  process.env.TOKEN;
    
    if (!token) {
      throw new Error("DISCORD_BOT_TOKEN o TOKEN non configurato nel file .env");
    }

    await client.login(token);

  } catch (error) {
    console.error("❌ Errore durante l'avvio del bot:", error);
    isRunning = false;
    client = null;
    throw error;
  }
};

// Funzione per fermare il bot
export const stopBot = async () => {
  if (!client || !isRunning) {
    console.log("⚠️ Nessun bot attivo da fermare.");
    return;
  }

  try {
    console.log("⛔ Arresto del bot Discord...");
    
    client.removeAllListeners();
    await client.destroy();
    
    client = null;
    isRunning = false;
    
    console.log("✅ Bot disconnesso");
  } catch (error) {
    console.error("❌ Errore durante l'arresto del bot:", error);
    throw error;
  }
};

// Cleanup quando il processo termina
process.on("SIGINT", async () => {
  console.log("\n⚠️  Ricevuto SIGINT, chiusura bot...");
  if (isRunning) {
    await stopBot();
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️  Ricevuto SIGTERM, chiusura bot...");
  if (isRunning) {
    await stopBot();
  }
  process.exit(0);
});