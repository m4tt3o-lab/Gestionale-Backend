import Discount from "../Models/Discounts.js";
import { Op } from "sequelize";


export const getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.findAll();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero dei discounts' });
    }
};
//---------------------------------------------------------------

export const getDiscountsBySito = async (req, res) => {
  try {
    const { Sito } = req.query;

    const whereClause = {};

    if (Sito) {
      whereClause.Sito = { [Op.like]: `%${Sito}%` }; 
    }
    const discounts = await Discount.findAll({ where: whereClause });
    res.json(discounts);
    
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei discounts' });
  }
}
//------------------------------------------------------------------


export const postDiscount = async (req, res) => {
    try {
        const { Sito, Sconto, dataCreazione, dataScadenza } = req.body;

        // Validazione del campo "Sconto"
        if (Sconto < 6 || Sconto > 12) {
            return res.status(400).json({ error: "Il valore di Sconto deve essere tra 6 e 12." });
        }

        // Creazione del discount
        const newDiscount = await Discount.create({
            Sito,
            Sconto,
            dataCreazione: dataCreazione,
            dataScadenza: dataScadenza || null,
        });

        // Risposta di successo
        res.status(201).json(newDiscount);
    } catch (error) {
        console.error("Errore durante la creazione del discount:", error);
        res.status(500).json({ error: "Errore durante la creazione del discount" });
    }
};
//---------------------------------------------------------------

export const updateDiscount = async (req, res) => {
    const { id } = req.params;
    const { Sito, Sconto, dataCreazione, dataScadenza } = req.body;
    
    try {
      const discount = await Discount.findByPk(id);
      if (!discount) {
        return res.status(404).json({ error: 'discount non trovato' });
      }
   
      discount.Sito = Sito;
      discount.Sconto = Sconto;
      discount.dataCreazione = dataCreazione;
      discount.dataScadenza = dataScadenza|| null ;
      
      await discount.save(); 
  
      res.status(200).json(discount);
      
    } catch (error) {
      res.status(500).json({ error: 'Errore nell\'aggiornamento del discount' });
    }
  };
  


//---------------------------------------------------------------
export const deleteDiscount = async (req, res) => {
    const { id } = req.params;
    
    try {
      const discount = await Discount.findByPk(id); 
      if (!discount) {
        return res.status(404).json({ error: 'discount non trovato' });
      }
      await discount.destroy(); 
      res.status(204).send(); 
  
    } catch (error) {
      res.status(500).json({ error: 'Errore nella cancellazione del discount' });
    }
  };

//---------------------------------------------------------------

  