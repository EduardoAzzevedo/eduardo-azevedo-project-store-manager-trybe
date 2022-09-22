const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../src/controllers/productController');
const productsService = require('../../../src/services/productsServices');
const { mockProducts, expectObject } = require('./mockControll');

describe('Verificando service Products Controller', function () {
  describe('Listando todos os produtos listados', function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    beforeEach(function () {
      sinon.stub(productsService, 'findAllProducts').resolves(mockProducts);
    });

    afterEach(function () {
      productsService.findAllProducts.restore();
    });

    it('listagem de produtos é array', async function () {
      await productsController.findAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Listando todos os produtos por id', function () {

    const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    beforeEach(function () {
      sinon.stub(productsService, 'findById').resolves(expectObject);
    });

    afterEach(function () {
      productsService.findById.restore();
    });

    it('retorna o produtos por id', async function () {
      await productsController.findById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(false);
    });
  });

  describe('Inserindo produto', function () {

    const req = { body: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    beforeEach(function () {
      sinon.stub(productsService, 'insertP').resolves(expectObject);
    });

    afterEach(function () {
      productsService.insertP.restore();
    });

    it('Insere o produto', async function () {
      await productsController.insert(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});