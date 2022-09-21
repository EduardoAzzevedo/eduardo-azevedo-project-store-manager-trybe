const sinon = require('sinon');
const { expect } = require('chai');

const { productModel } = require('../models/productsModels.test');
const { productService } = require('../services');
const { productsServiceList } = require('./mocks/productsListService.mock');

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

      expect(products.message instanceof Array).to.equal(true);
    });

    it('retorna a lista de produtos com sucesso', async function () {
      const result = await productService.findBy();

      expect(result.message).to.deep.equal(productsServiceList);
    });
  });
});