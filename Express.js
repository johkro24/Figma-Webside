app.post('/cart', async (req, res) => {
    const { name, price, quantity } = req.body;
    const newItem = new Cart({ name, price, quantity });
    try {
      await newItem.save();
      res.json(newItem);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  