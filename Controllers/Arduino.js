import Sneaker from "../Models/Sneakers.js";

export const getCount = async (req, res) => {
  try {
    // Somma di tutti i prezzi d'acquisto
    const sommaTotale = await Sneaker.sum('prezzoAcquisto');

    // contare quante sneakers ci sono
    const count = await Sneaker.count();

    res.status(200).json({
      totale: sommaTotale || 0,
      numeroSneakers: count || 0
    });
  } catch (error) {
    console.error("Errore nel recupero della somma:", error);
    res.status(500).json({ error: 'Errore nel recupero delle sneakers' });
  }
};