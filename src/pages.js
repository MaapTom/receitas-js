const Database = require('./database/db')
const saveReceita = require('./database/saveReceita')

module.exports = {
  async index(req, res) {

    try{
      const db = await Database;
      const results = await db.all(`SELECT * FROM receitas ORDER BY id DESC LIMIT 1`);
      const receita = results[0];

      return res.render('index', {receita})
    } catch(error) {
      console.log(error);
      return res.render('server-error')
    }

  },
  
  async receita(req, res) {
    try {
      const id = req.params.i;
      const db = await Database;
      const results = await db.all(`SELECT * FROM receitas WHERE id = ${id}`)
      const receita = results[0];

      const newIngrediente = receita.ingredientes.split(/85985,|85985/)
      newIngrediente.pop()
          
      return res.render('receita', {receita, newIngrediente})

    } catch(error) {
      console.log(error)
      return res.render('server-error')
    }
  },

  async pesquisa (req, res) {
    try {
      const valorDaPesquisa = req.query.s;
      const db = await Database;
      const results = await db.all(`SELECT * FROM receitas WHERE nome_receita LIKE '%${valorDaPesquisa}%'`);
      const receita = results;

      return res.render('search', {receita, valorDaPesquisa});

    } catch(error) {
      console.log(error)
      return res.render('server-error')
    }
  },

  async categoria(req, res) {
    try {
      const tipoDePrato = req.params.p;
      const db = await Database;
      const results = await db.all(`SELECT * FROM receitas WHERE tipo = '${tipoDePrato}'`);
      const receita = results;
      let categoria = '';

      if (tipoDePrato == 'Prato-salgado') {
        categoria = 'Pratos Salgados';
      } else if (tipoDePrato == 'Sobremesa') {
        categoria = 'Sobremesas';
      } else {
        categoria = 'Pratos Saudáveis';
      }

      return res.render('categoria', {receita, categoria})

    } catch(error) {
      console.log(error)
      return res.render('server-error', {error})
    }
  },

  enviarReceita(req, res) {
    return res.render('enviar-receita')
  },

  async saveReceita(req, res){
  
    const dados = req.body;
    let newIngrediente ;

    if (Array.isArray(dados.ingrediente)) {
       newIngrediente = dados.ingrediente.map((item) => {
        
        return item+'85985';
      })
    }

    if (Object.values(dados).includes('')) {
      return response.send('Preencha todos os campos!')
    }

    if(!req.file){
      return res.send('Ops! Um errro ocorreu, tente mais tarde!');
    }

    try {
      const db = await Database;
      await saveReceita(db, {
        nome_receita: dados.nomeReceita,
        imagem: req.file.filename,
        tipo: dados.tipo,
        ingredientes: newIngrediente || dados.ingrediente,
        tempo_preparo: dados.tempo_preparo,
        rendimento: dados.rendimento,
        modo_de_preparo: dados.modo_de_preparo,
      })

      return res.redirect('/')

      } catch (error) { 
        console.log(error)
        return res.render('server-error')
    }

    }
  }