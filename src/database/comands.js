const Database = require('./db');
const saveReceita = require('./saveReceita')

Database.then(async (db) => {

  // //Inserir dados na tabela
  // await saveReceita(db, {
  //   nome_receita: "Macarrão ao molho Branco",
  //   imagem: "testeImagem",
  //   tipo: "testeSobremesa",
  //   qtd: "1",
  //   ingredientes: "Macarrão",
  //   modo_de_preparo: "Jogar na água"
  // })


  const selectReceitas = await db.all("DELETE  FROM receitas")
  // const deleteInsert = await db.run("DELETE FROM receitas WHERE id = '13'");
  console.log(selectReceitas)

})