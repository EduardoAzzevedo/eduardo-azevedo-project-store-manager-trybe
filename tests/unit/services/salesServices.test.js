const { expect } = require("chai");
const sinon = require("sinon");

const salesServices = require('../../../src/services/salesService');
const saleModel = require("../../../src/models/salesModel");
const { mockList } = require('./mockService');

describe('Testando a camada salesServices', () => {
  before(async () => {
    sinon.stub(saleModel, '')
  });
  after(async () => {
    
  });
});



