function saveReceita(db, receita) {
  return db.run(`
      INSERT INTO receitas (
          nome_receita,
          imagem,
          tipo,
          ingredientes,
          tempo_de_preparo,
          rendimento,
          modo_de_preparo
      ) VALUES (
          "${receita.nome_receita}",
          "${receita.imagem}",
          "${receita.tipo}",
          "${receita.ingredientes}",
          "${receita.tempo_preparo}",
          "${receita.rendimento}",
          "${receita.modo_de_preparo}"
      );
  `
  )
}

module.exports = saveReceita;