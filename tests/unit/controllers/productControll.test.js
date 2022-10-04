const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../src/controllers/productController');
const productsService = require('../../../src/services/productsServices');

const {
  mockProducts,
  mockControllersId,
  mockSearch,
  mockTextTypeResponse,
} = require('./mockControll');

describe('Testando a camada productsController', function () {

  describe('Testando o searchProductC', function () {
    it('Verifica se searchProductC retorna os produtos pesquisados por query', async function () {
      const req = {};
      const res = {};
      req.query = { q: 'Martelo de Thor' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'searchProductS').resolves(mockSearch);
      await productsController.searchProductC(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  })

  describe('Testando o findAllProducts', function () {
    it('Verifica se o findAllProducts retorna uma lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findAllProducts').resolves(mockProducts);

      await productsController.findAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProducts)).to.be.equal(true);
    });
  });

  describe('Testando o findById', function () {

    it('Verifica se o findById retorna um produto', async function () {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves(mockControllersId);
      await productsController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(
        res.json.calledWith(mockControllersId)
      ).to.be.deep.equal(true);
    });

    it('Verifica se o "findById" retorna um erro ao procurar produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "findById")
        .resolves(mockTextTypeResponse);

      await productsController.findById(req, res);

      expect(res.status.calledWith({ type: null })).to.be.equal(true);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.deep.equal(true);
    });
  });

  describe('Testando o "insert"', function () {
    it('Verifica se o "insert" retorna o produto cadastrado com sucesso', async function () {
      const res = {};
      const req = { body: { name: "ProductX" } };

      const expected = {
        id: 1,
        name: "ProductX",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'insertP').resolves(expected);

      await productsController.insert(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    });

    it('Verifica se o "insert" retorna um erro ao passar a chave "name" errado', async function () {
      const res = {};
      const req = { body: { name: "ProductX" } };

      const error = {
        id: 1,
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "insertP")
        .resolves(error);

      await productsController.insert(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(
        res.json.calledWith(error)
      ).to.be.deep.equal({ message: '"name" is required' });
    });

    it('Verifica se o "insert" retorna um erro ao passar um valor para "name" inválido', async function () {
      const res = {};
      const req = { body: { name: "a" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "insertP").resolves({
        type: 'errorInvalideValue',
        message: '"name" length must be at least 5 characters long',
      });

      await productsController.insert(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(
        res.json.calledWith({
          message: '"name" length must be at least 5 characters long',
        })
      ).to.be.equal(true);
    });
  });

  describe('Testes do "updateProductC"', function () {
    it('Verifica se o "updateProductC" retorna o produto atualizado com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: "Martelo do Batman" } };

      const expected = {
        id: 1,
        name: "Martelo do Batman",
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'productUpdate').resolves({ type: null, message: expected });

      await productsController.updateProductC(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(expected)).to.be.equal(true);
    });

    it('Verifica se o "updateProductC" retorna um erro tentar alterar um produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 }, body: { name: "Martelo do Batman" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "productUpdate")
        .resolves({ type: 'errorNotFount', message: "Product not found" });

      await productsController.updateProductC(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(true);
    });

    it('Verifica se o "updateProductC" retorna um erro ao passar um "name" inválido', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { n: "Martelo do Batman" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "productUpdate")
        .resolves({ type: "INVALID_FIELD", message: '"name" is required' });

      await productsController.updateProductC(req, res);

      expect(res.status.calledWith(400)).to.be.equal(true);
      expect(
        res.json.calledWith({ message: '"name" is required' })
      ).to.be.equal(true);
    });
  });

  describe('Testes do "deleteProduct"', function () {
    it('Verifica se o "deleteProduct" retorna status 204 sem mensagem', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: '' });

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith()).to.be.equal(true);
    });

    it('Verifica se o "deleteProduct" retorna erro ao passar id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "deleteProduct")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(
        res.json.calledWith({ message: "Product not found", })
      ).to.be.equal(true);
    });
  });

  this.afterEach(sinon.restore)
});