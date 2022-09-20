const connection = require('./connection');

const allProducts = async () => {
  const query = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  const [result] = await query;
  return result;
};

const idProducts = async (id) => {
  const query = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE id = ${Number(id)}`,
  );
  const [result] = await query;
  return result[0];
};

module.exports = {
  allProducts,
  idProducts,
};