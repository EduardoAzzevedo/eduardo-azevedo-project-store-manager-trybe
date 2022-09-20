const connection = require('./connection');

const allProducts = async () => {
  const query = await connection
    .execute('SELECT * FROM StoreManager.products');
  const [result] = await query;
  return result;
};

const idProducts = async (id) => {
  const query = await connection
    .execute(`SELECT * FROM StoreManager.products WHERE id = ${Number(id)}`);
  const [result] = await query;
  return result[0];
};

const createProduct = async (name) => {
  const query = await connection
    .execute('INSERT INTO StoreManager.products(name) VALUE (?)', [name]);
  const [result] = await query;
  const { insertId } = result;
  const productInsert = await idProducts(insertId);
  return productInsert;
};

module.exports = {
  allProducts,
  idProducts,
  createProduct,
};