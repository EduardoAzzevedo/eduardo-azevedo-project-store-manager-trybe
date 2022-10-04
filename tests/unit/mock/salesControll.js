const mockInsertOk = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const mockAllSales = [
  {
    saleId: 1,
    date: "2022-09-11T03:25:34.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-09-11T03:25:34.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-09-11T03:25:34.000Z",
    productId: 3,
    quantity: 15,
  },
];

const mocksaleById = [
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
];

const mockUpdateSale = {
  saleId: 2,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

module.exports = {
  mockInsertOk,
  mockAllSales,
  mocksaleById,
  mockUpdateSale,
}