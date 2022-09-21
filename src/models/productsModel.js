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
// const insert = async (name) => {
//   const [{ result }] = await connection.execute(
//     'INSERT INTO StoreManager.products (name) VALUE (?)',
//     [name],
//   );

//   return result;
// };

module.exports = {
  findAll,
  idProducts,
  // insert,
};