const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../src/models/productsModel');
const productService = require('../../../src/services/productsServices');
const productsServiceList = require('./mocks/productsListService.mock');
const { insert } = require('../../../src/controllers/productController');

describe('Verificando service Products', function () {
  describe('Listando todos os produtos', function () {
    beforeEach(function () {
      sinon.stub(productModel, 'findBy').resolves(productsServiceList);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('a lista de produtos é um array', async function () {
      const products = await productService.findBy();

      expect(products instanceof Array).to.equal(true);
    });

    it('retorna a lista de produtos com sucesso', async function () {
      const res = await productService.findBy();

      expect(res).to.deep.equal(productsServiceList);
    });
  });
});

describe('Cadastrando um novo produto com sucesso', function () {

  afterEach(function () {
    sinon.restore();
  });

  beforeEach(function () {
    sinon.stub(productsModel, 'insert').resolves({});
  });

  it('não retorna erros', async function () {
    const response = await productsService.insert({});

    expect(response.type).to.equal(null);
  });

  it('retorna o produto cadastrado', async function () {
    await productsService.insert({ insertId });

    expect(response.message).to.equal({ insertId });
  });
});