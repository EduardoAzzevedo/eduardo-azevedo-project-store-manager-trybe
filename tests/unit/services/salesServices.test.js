const { expect } = require("chai");
const sinon = require("sinon");

const salesServices = require('../../../src/services/salesService');
const saleModel = require("../../../src/models/salesModel");
const { mockSalesById, mockSales } = require('./mockService');
const { allSales, salesById } = require('../mock/saleModel');

describe('Testando a camada salesServices', () => {
  describe('Testando o getSales', async () => {
    before(async () => {
      sinon.stub(saleModel, 'findAll').resolves(allSales);
    });
    after(async () => {
      saleModel.findAll.restore();
    });
    it('Verificar se retorna todas as vendas com sucesso', async () => {
      const result = await salesServices.getSales();
      expect(result).to.deep.equal(mockSales);
    });
  });

  describe('Testando o saleById', async () => {
    before(async () => {
      sinon.stub(saleModel, 'findAllById').resolves(salesById);
    });
    after(async () => {
      saleModel.findAllById.restore();
    });
    it('Verificar se retorna vendas por id com sucesso', async () => {
      const result = await salesServices.saleById(1);
      expect(result).to.deep.equal(mockSalesById);
    });
  });

  // describe('Testando o deleteSale', async () => {
  //   before(async () => {
  //     sinon.stub(saleModel, 'findAllById').resolves(mockSales[1].id);
  //     sinon.stub(saleModel, 'deleteSaleM').resolves(mockSalesById);
  //   });
  //   after(async () => {
  //     saleModel.deleteSaleM.restore();
  //     saleModel.findAllById.restore();
  //   });
  //   it('Verificar se retorna array de objeto confirmando que não tem mais a venda excluída', async () => {
  //     const result = await salesServices.deleteSale(2);
  //     expect(result).to.be.deep.equal(mockSalesById);
  //   });
  // });
});