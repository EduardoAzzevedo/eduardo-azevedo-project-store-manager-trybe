const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productsModel');
const { expect } = require('chai');

describe("Verifica se retorna os produtos", () => {

  describe("Verifica se retorna os produtos, quando feita a procura", function () {
    before(async function () {
      const execute = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productModel.findById(1);
      expect(response).to.be.a('object');
    });

    it('com sucesso', async function () {
      const expected = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      const response = await productModel.findAll();
      expect(response).to.deep.equal(expected);
    });
  });
});

describe('Products Model', function () {
  describe('Encontra um produto pelo id', function () {
    before(async function () {
      const execute = [
        {
          "id": 3,
          "name": "Escudo do Capitão América",
        },
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async function () {
      connection.execute.restore();
    });
    const expected =
    {
      "id": 3,
      "name": "Escudo do Capitão América",
    };

    const payload = 3;

    it('com sucesso', async function () {
      const response = await productModel.findById(payload);

      expect(response).to.deep.equal(expected);

    });
  });
});

describe('Products Model', function () {
  describe('Inserir produto', function () {
    before(async function () {
      const execute = [
        {
          "name": "ProdutoX"
        }
      ];

      sinon.stub(connection, 'execute').resolves([execute]);
    });
    after(async function () {
      connection.execute.restore();
    });
    const expected = [
      {
        "name": "ProdutoX"
      }
    ];
    it('com sucesso', async function () {
      const response = await productsModel.insert();

      expect(response).to.deep.equal(expected);
    });
  });
});