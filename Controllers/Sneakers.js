import Sneaker from "../Models/Sneakers.js";
import { Op } from "sequelize";
import SneaksAPI from 'sneaks-api';
const sneaks = new SneaksAPI();

export const getSneakers = async (req, res) => {
  try {
    const sneakers = await Sneaker.findAll();
    res.status(200).json(sneakers);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle sneakers' });
  }
};


//------------------------------------------------------------------

export const getSneakerById = async (req, res) => {
  const { id } = req.params;
  try {
    const sneaker = await Sneaker.findByPk(id); // Cerco l'id
    if (!sneaker) {
      return res.status(404).json({ error: 'sneaker non trovato' });
    }
    res.status(200).json(sneaker);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delka sneaker' });
  }
};

//------------------------------------------------------------------

export const getSneakersByModel = async (req, res) => {
  try {
    const { modello } = req.query;

    const whereClause = {};
    

    if (modello) {
      whereClause.modello = { [Op.iLike]: `%${modello}%` }; 
    }
    const sneakers = await Sneaker.findAll({ where: whereClause });
    res.json(sneakers);
    
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle sneakers' });
  }
}
//------------------------------------------------------------------


export const postSneaker = async (req, res) => {
  const { modello, dataAcquisto, prezzoAcquisto, dataVendita, prezzoVendita } = req.body;

  if (prezzoVendita && !dataVendita) {
    return res.status(400).json({ error: 'Non puoi inserire un prezzo di vendita senza una data di vendita.' });
  }

  // Uso sneaks-api per cercare l'immagine
  const getImageUrlFromSneaks = (modello) => {
    return new Promise((resolve, reject) => {
      sneaks.getProducts(modello, 1, (err, prodotti) => {
        if (err || !prodotti || prodotti.length === 0) {
          return resolve(''); // fallback se non trova nulla
        }
        resolve(prodotti[0].thumbnail); // URL dell'immagine
      });
    });
  };

  try {
    const imageUrl = await getImageUrlFromSneaks(modello);

    const newSneaker = await Sneaker.create({ 
      imageUrl, 
      modello,
      dataAcquisto,
      prezzoAcquisto,
      dataVendita: dataVendita || null,
      prezzoVendita: prezzoVendita || null
    });

    res.status(201).json(newSneaker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione della sneaker' });
  }
};


//------------------------------------------------------------------

export const updateSneaker = async (req, res) => {
  const { id } = req.params;
  const { modello, dataAcquisto, prezzoAcquisto, dataVendita, prezzoVendita } = req.body;
  
  const getImageUrlFromSneaks = (modello) => {
    return new Promise((resolve, reject) => {
      sneaks.getProducts(modello, 1, (err, prodotti) => {
        if (err || !prodotti || prodotti.length === 0) {
          return resolve(''); // fallback se non trova nulla
        }
        resolve(prodotti[0].thumbnail); // URL dell'immagine
      });
    });
  };

  try {
    const sneaker = await Sneaker.findByPk(id);

    if (!sneaker) {
      return res.status(404).json({ error: 'Sneaker non trovata' });
    }

    if (modello !== sneaker.modello) {
      sneaker.imageUrl = await getImageUrlFromSneaks(modello);
    }

    sneaker.modello = modello;
    sneaker.dataAcquisto = dataAcquisto;
    sneaker.prezzoAcquisto = prezzoAcquisto;
    sneaker.dataVendita = dataVendita;
    sneaker.prezzoVendita = prezzoVendita;

    await sneaker.save(); 

    res.status(200).json(sneaker);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento della sneaker' });
  }
};

//------------------------------------------------------------------

export const deleteSneaker = async (req, res) => {
  const { id } = req.params;
  
  try {
    const sneaker = await Sneaker.findByPk(id); 
    if (!sneaker) {
      return res.status(404).json({ error: 'sneaker non trovata' });
    }
    await sneaker.destroy(); 
    res.status(204).send(); 

  } catch (error) {
    res.status(500).json({ error: 'Errore nella cancellazione della sneaker' });
  }
};


