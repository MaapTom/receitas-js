const express = require("express")
      server = express()
      pages = require("./pages")
      path = require("path")
      bodyParser = require('body-parser')
      multer = require('./middleware/multer');

server
//Config bodyParser
.use(bodyParser.urlencoded({extended: true}))
.use(bodyParser.json())

//Indicando local dos arquivos estáticos
.use(express.static('public'))

//Config template engine. Usei hbs não handlebars
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs')

//Rotas da aplicação
.get('/', pages.index)
.get('/search', pages.pesquisa)
.get('/receita/:i', pages.receita)
.get('/categoria/:p', pages.categoria)
.get('/enviar-receita', pages.enviarReceita)
.post('/save-receita', multer.single('image'), pages.saveReceita)
.use(function (req, res, next) {
  res.status(404).send("Desculpe, esse endereço não existe. Tente novamente mais tarde! : (")
})

//iniciando servidor
server.listen(process.env.PORT || 8081, () => {
  console.log("O servidor está rodando!")
})