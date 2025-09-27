import SneaksAPI from 'sneaks-api';
const sneaks = new SneaksAPI();


export const searchSneakers = (req, res) => {
  const { query } = req.query; 

  sneaks.getProducts(query, 10, (err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Errore durante la ricerca delle sneakers' });
    }
    
    // mappiamo solo nome e id eventualmente
    const results = products.map(product => ({
      name: product.shoeName,
      //image: product.thumbnail,
    }));

    res.json(results);
  });
};
