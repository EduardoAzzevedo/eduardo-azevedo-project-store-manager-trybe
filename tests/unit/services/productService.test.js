const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../src/models/productsModel');
const productService = require('../../../src/services/productsServices');
const { mockList, mockInsert, validation } = require('./mockService');

describe('Verificando service Products Services', function () {
  describe('Listando todos os produtos', function () {
    beforeEach(function () {
      sinon.stub(productModel, 'findAll').resolves(mockList);
    });

    afterEach(function () {
      productModel.findAll.restore();
    });

    it('a lista de produtos é um array', async function () {
      const products = await productService.findAllProducts(mockList);
      expect(products instanceof Array).to.equal(true);
    });

    it('retorna a lista de produtos com sucesso', async function () {
      const res = await productService.findAllProducts();

      expect(res).to.deep.equal(mockList);
    });
  });

  describe('Cadastrando um produto novo com sucesso', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.stub(productModel, 'insert').resolves(mockInsert);
    });
    it('inserindo Produto por id', async function () {
      const res = await productService.insertP('fulano');
      expect(res).to.deep.equal({ id: mockInsert.insertId, name: 'fulano' });
    });
  });

  describe('Listando o produto por id', function () {
    afterEach(function () {
      productModel.idProducts.restore();
    });

    beforeEach(function () {
      sinon.stub(productModel, 'idProducts').resolves(mockList);
    });

    it('Retorna produto por id', async function () {
      const result = await productService.findById(1);
      expect(result).to.deep.equal(mockList);
    });
  });
  describe('Validando produtos', function () {
    afterEach(function () {
      productService.validateproduct.restore();
    });

    beforeEach(function () {
      sinon.stub(productService, 'validateproduct').resolves(validation(4))
    });
    it('retorna falso', async function () {
      const valid = await productService.validateproduct(4);
      expect(valid).to.be(false);
    });
  });
});