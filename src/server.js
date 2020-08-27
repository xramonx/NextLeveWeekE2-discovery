//You can run the server by src/server.js and it will be available at localhost:5500 (127.0.0.1:5500)
//It will be necessary to have NODE.JS installed
//Option under development mode, it is possible to run 'npm run dev' which will enable nodemon src/server.js (*package.json)

//Server creation
const express = require('express')
const server = express()

const {
    pageLanding, 
    pageStudy, 
    pageGiveClasses,
    saveClasses
} = require ('./pages')


//configurar nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})

//início e configuração do servidor
server
    //receber os dados do req.body
    .use(express.urlencoded({extended: true}))

    //configurar arquivsos estáticos (css, scripts, imagens)
    .use(express.static("public"))//configuraçao
    
    //rotas da aplicação
    .get("/", pageLanding)// .get("/give-classes", (req, res) => {return res.sendFile(__dirname + "/views/give-classes.html")})
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses) 
    .post("/save-classes", saveClasses)
    .listen(5500)

    