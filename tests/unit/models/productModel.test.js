const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productsModel');
const { executeMock, deletedMock } = require('./mockModel');

describe("Verifica se retorna os produtos", () => {

  describe("Verifica se retorna os produtos, quando feita a procura", function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([executeMock]);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('com o tipo array', async function () {
      const response = await productModel.idProducts(1);
      expect(response).to.be.a('object');
    });

    it('com sucesso', async function () {
      const response = await productModel.findAll();
      expect(response).to.deep.equal(executeMock);
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
      const response = await productModel.idProducts(payload);

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
      const response = await productModel.insert();

      expect(response).to.deep.equal(expected);
    });
  });

  describe('Deletando por id', function () {
    before(async function () {
      sinon.stub(connection, 'execute').resolves([{ deletedMock }])
    });
    after(async function () {
      connection.execute.restore();
    });
    it('Deleta com sucesso', async function () {
      const deleted = await productModel.deleteProduct([{ id: 1 }]);
      expect(deleted).to.be.equal(deletedMock);
    });
  });
});