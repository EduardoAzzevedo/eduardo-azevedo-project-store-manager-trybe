const mockList = [
  {
    id: 1,
    name: "Machado do Thor Stormbreaker",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const mockInsert = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 6,
  info: '',
  serverStatus: 2,
  warningStatus: 0
};

const validation = (id) => {
  if (!mockList[1].id === 1) return false;
}

module.exports = { mockList, mockInsert, validation };