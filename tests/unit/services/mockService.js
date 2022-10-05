const { allSales } = require('../mock/saleModel');
const mockList = [
  {
    id: 1,
    name: "Machado do Thor Stormbreaker",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const mockInsert = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 6,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const mockSales = {
  type: null,
  message: allSales,
};

const mockSalesById = {
  type: null,
  message: [
    {
      date: "2022-09-11T03:25:34.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      date: "2022-09-11T03:25:34.000Z",
      productId: 2,
      quantity: 10,
    },
  ],
};

const errorSalesMessage = {
  errorNotFound: 404,
  errorInvalidFild: 400,
  errorInvalidValue: 422,
};

module.exports = {
  mockList,
  mockInsert,
  mockSales,
  mockSalesById,
  errorSalesMessage,
};