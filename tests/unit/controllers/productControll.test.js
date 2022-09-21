const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const mockProducts = require('./mocks/mockProducts.mock');

describe('Verificando service Products', function () {
  describe('Listando todos os produtos listados', function () {
    beforeEach(function () {
      sinon.stub(productsService, 'findBy').resolves(mockProducts);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('retorna a lista de produtos com sucesso', async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.findBy(req, res);

      expect(res.status.calledWith(200)).to.equal(true);
      expect(res.json.calledWith(mockProducts)).to.equal(true);
    });
  });
});