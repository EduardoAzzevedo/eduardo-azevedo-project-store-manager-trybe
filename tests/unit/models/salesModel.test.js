const { expect } = require("chai");
const sinon = require("sinon");

const saleModel = require("../../../src/models/salesModel");
const connection = require("../../../src/models/connection");

const { allSales, salesById } = require('../mock/saleModel');


describe('Testes da camada Models, componente Sales', function () {

  afterEach(sinon.restore);

  describe('Testando o Insert', function () {
    it('Verifica se Insert retorna o id das vendas cadastradas com sucesso', async function () {
      sinon.stub(connection, "execute")
        .onFirstCall().resolves([{ insertId: 1 }]);

      const result = await saleModel.insert.itemVendido([
        {
          productId: 1,
          quantity: 0,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ]);

      expect(result).to.be.equal(1);
    });
  });

  describe('Testando o findAll', function () {
    it('Verifica se o findAll retorna uma lista de vendas com sucesso', async function () {
      sinon.stub(connection, "execute").resolves([allSales]);

      const result = await saleModel.findAll();

      expect(result).to.be.deep.equal(allSales);
    });
  });

  describe('Testando o findAllById', function () {
    it('Verifica se o findAllById retorna um produto com sucesso', async function () {
      sinon.stub(connection, "execute").resolves([salesById]);

      const result = await saleModel.findAllById(1);

      expect(result).to.be.deep.equal(salesById);
    });
  });

  describe('Testando o updateSaleM', function () {
    it('Verifica se o updateSaleM retorna as linhas afetadas com sucesso', async function () {
      sinon
        .stub(connection, "execute").resolves([{ salesItem: 1 }]);

      const result = await saleModel.updateSaleM(1, 2, 30);

      expect(result).to.be.equal(1);
    });
  });

  describe('Testando o deleteSaleM', function () {
    it('Verifica se o deleteSaleM retorna as linhas afetadas com sucesso ', async function () {
      sinon.stub(connection, "execute").resolves([{ salesItem: 1 }]);

      const result = await saleModel.deleteSaleM(1);

      expect(result).to.be.equal(1);
    });
  });
});