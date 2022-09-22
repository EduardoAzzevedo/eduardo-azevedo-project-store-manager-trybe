const connection = require('./connection');

const findBy = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id as saleId, sa.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as sa on sa.id = sp.sale_id
    ORDER BY sale_id, product_id`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales AS sa on sa.id = sp.sale_id 
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id;`,
    [saleId],
  );
  return result;
};

const insert = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return result;
};

module.exports = {
  findBy,
  findById,
  insert,
};  