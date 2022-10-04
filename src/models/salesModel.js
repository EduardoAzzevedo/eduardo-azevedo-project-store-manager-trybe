const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sa.id AS 'saleId',
      sa.date, sp.product_id AS 'productId',
      sp.quantity
    FROM StoreManager.sales AS sa
    JOIN StoreManager.sales_products AS sp
    ON sa.id = sp.sale_id
    ORDER BY saleId, productId`,
  );
  return result;
};

const findAllById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS 'productId',
      sp.quantity
    FROM StoreManager.sales AS sa
    JOIN StoreManager.sales_products AS sp
    ON sa.id = sp.sale_id
    WHERE sa.id = ?
    ORDER BY productId`,
    [saleId],
  );
  return result;
};

const insert = {
  dataVenda: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
    );

    return insertId;
  },
  itemVendido: async (saleId, productId, quantity) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    );

    return insertId;
  },
};

const deleteSaleM = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
};

const updateSaleM = async (saleId, productId, quantity) => {
  await connection.execute(`
  UPDATE StoreManager.sales_products
  SET quantity = ?, product_id = ?
  WHERE sale_id = ? AND product_id = ?
  `, [quantity, productId, saleId, productId]);
};

module.exports = {
  findAll,
  findAllById,
  insert,
  deleteSaleM,
  updateSaleM,
};  