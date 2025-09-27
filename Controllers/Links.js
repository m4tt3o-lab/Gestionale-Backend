import Link from "../Models/Links.js";

export const getLinks = async (req, res) => {
    try {
      const links = await Link.findAll();
      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ error: 'Errore nel recupero dei links' });
    }
  };


  export const deleteAllLinks = async (req, res) => {
    try {
      const deletedCount = await Link.destroy({
        where: {}, 
      });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Nessun percorso trovata da cancellare' });
      }
  
      res.status(200).json({ message: `Cancellati ${deletedCount} links` });
    } catch (error) {
      res.status(500).json({ error: 'Errore nella cancellazione dei links' });
    }
  };
  