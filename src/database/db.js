const Database = require('sqlite-async')

function execute(db) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_receita TEXT,
      imagem TEXT,
      tipo TEXT,
      ingredientes TEXT,
      tempo_de_preparo TEXT,
      rendimento TEXT,
      modo_de_preparo TEXT
    );
`);
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)