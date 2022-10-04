const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const idProducts = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)', [name],
  );

  return result;
};

const updateProduct = async (nameUpdate, idUpdate) => {
  await connection.execute('UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [nameUpdate, idUpdate]);
  return { id: idUpdate, name: nameUpdate };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return { id };
};

const searchProductM = async (query) => {
  const statementSearch = `%${query}%`;
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE products.name LIKE ?',
    [statementSearch],
  );
  return products;
};

module.exports = {
  findAll,
  idProducts,
  insert,
  updateProduct,
  deleteProduct,
  searchProductM,
};