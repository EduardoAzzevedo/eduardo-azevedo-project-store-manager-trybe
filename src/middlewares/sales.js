const validation = (req, res, next) => {
  const itemsSold = req.body;

  const productField = itemsSold.every(({ productId }) => productId);
  if (!productField) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const quantityInvalid = itemsSold.some(({ quantity }) => quantity < 1);
  if (quantityInvalid) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const quantityField = itemsSold.every(({ quantity }) => Number(quantity));
  if (!quantityField) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = validation;