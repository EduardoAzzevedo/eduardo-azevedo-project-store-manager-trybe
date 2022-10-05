const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require("../../../src/controllers/salesController");
const salesService = require("../../../src/services/salesService");

const {
  sucessSaleInsert,
  getAllSalesReturn,
  getSaleByIdReturn,
  updateSaleReturn,
  mockInsertOk,
  mockAllSales,
  mocksaleById,
  mockUpdateSale,
} = require("../mock/salesControll");

describe('Testando a camada do salesController', function () {

  afterEach(sinon.restore);

  describe('Testando o insertSale', function () {
    it('Verifica se retorna o cadastro da venda com sucesso', async function () {
      const res = {};
      const req = {
        body: [
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

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves({ type: null, message: mockInsertOk });

      await salesController.insertSale(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(mockInsertOk)).to.be.equal(true);
    });

    // it('Verifica se retorna o erro ao tentar cadastrar sem o "productId"', async function () {
    //   const res = {};
    //   const req = {
    //     body: [
    //       {
    //         quantity: 2,
    //       },
    //       {
    //         productId: 2,
    //         quantity: 5,
    //       },
    //     ],
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon
    //     .stub(salesService, "createSale")
    //     .resolves({
    //       type: 'errorNotFound',
    //       message: '"productId" is required',
    //     });

    //   await salesController.insertSale(req, res);

    //   expect(res.status.calledWith(400)).to.be.equal(true);
    //   expect(
    //     res.json.calledWith({ message: '"productId" is required' })
    //   ).to.be.equal(true);
    // });

    it('Verifica se retorna o erro ao tentar cadastrar com "quantity" inválido na requisição', async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 0,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "createSale").resolves({
        type: 'errorInvalidValue',
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.insertSale(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: '"quantity" must be greater than or equal to 1',
        })
      ).to.be.deep.equal(true);
    });
  });

  // describe('Testando o sales', function () {
  //   it('Verifica se o sales retorna a lista de vendas completa', async function () {
  //     const res = {};
  //     const req = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(salesService, 'getSales').resolves(mockAllSales);

  //     await salesController.sales(req, res);

  //     expect(res.status.calledWith(200)).to.be.equal(true);
  //     expect(res.json.calledWith(mockAllSales)).to.be.deep.equal(true);
  //   });
  // });

  describe('Testando o byId', function () {
    it('verifica se o byId retorna uma venda por id', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'saleById')
        .resolves({ type: null, message: mocksaleById });

      await salesController.byId(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mocksaleById)).to.be.equal(true);
    });

    // it('verifica se o byId retorna um erro ao procurar produto inexistente', async function () {
    //   const res = {};
    //   const req = { params: { id: 999 } };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon
    //     .stub(salesService, 'saleById')
    //     .resolves({ type: "NOT_FOUND", message: "Sale not found" });

    //   await salesController.byId(req, res);

    //   expect(res.status.calledWith(404)).to.be.equal(true);
    //   expect(
    //     res.json.calledWith({
    //       message: "Sale not found",
    //     })
    //   ).to.be.equal(true);
    // });
  });

  describe('Testando o updateSaleC', function () {
    it('Verifica se retorna a atualização de venda com sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: [
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

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSaleS').resolves({ type: null, message: mockUpdateSale });

      await salesController.updateSaleC(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockUpdateSale)).to.be.equal(true);
    });

    // it('Verifica se retorna um erro ao alterar uma venda inexistente', async function () {
    //   const res = {};
    //   const req = {
    //     params: { id: 999 },
    //     body: [
    //       {
    //         quantity: 2,
    //       },
    //       {
    //         productId: 2,
    //         quantity: 5,
    //       },
    //     ],
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon
    //     .stub(salesService, "saleById")
    //     .resolves({
    //       type: "NOT_FOUND",
    //       message: 'Sale not found',
    //     });

    //   await salesController.byId(req, res);

    //   expect(res.status.calledWith(404)).to.be.equal(true);
    //   expect(
    //     res.json.calledWith({ message: 'Sale not found' })
    //   ).to.be.equal(true);
    // });
  });

  describe('Testando o deleteSaleC', function () {
    it('verifica se o deleteSaleC retorna uma venda', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'deleteSale')
        .resolves({ type: null, message: '' });

      await salesController.deleteSaleC(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });

    // it('verifica se o "deleteSale" retorna um erro ao deletar venda inexistente', async function () {
    //   const res = {};
    //   const req = { params: { id: 999 } };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon
    //     .stub(salesService, "deleteSale")
    //     .resolves({ type: "NOT_FOUND", message: "Sale not found" });

    //   await salesController.deleteSale(req, res);

    //   expect(res.status.calledWith(404)).to.be.equal(true);
    //   expect(
    //     res.json.calledWith({
    //       message: "Sale not found",
    //     })
    //   ).to.be.equal(true);
    // });
  });
});