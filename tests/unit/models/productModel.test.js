const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../models');
const { expect } = require('chai');
const productsModel = require('../models');

describe("Verifica se retorna os produtos", () => {

  describe("Verifica se retorna os produtos, quando feita a procura", function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        },
      ];

      sinon.stub(connection, 'execute').resolves();
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productsModel.findAll();
      expect(response).to.be.a('array');
    });

    it('com sucesso', async function () {
      const expected = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        },
      ];

      const response = await productsModel.findAll();
      expect(response).to.deep.equal(expected);
    });
  });
});

describe('Products Model', function () {
  describe('Encontra um produto pelo id', function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async function () {
      connection.execute.restore();
    });
    const expected =
    {
      "id": 1,
      "name": "Martelo de Thor",
    };

    const payload = 2;

    it('com sucesso', async function () {
      const response = await productsModel.findById(payload);

      expect(response).to.deep.equal(expected);

    });
  });
});