//DATA
let proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "41 98754-45635",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },  
    {
        name: "Daniele Evangelista",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "41 98754-45635",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1000]
    }
]

const subjects = [
"Artes",
"Biologia",
"Ciências",
"Educação física",
"Física",
"Geografia",
"História",
"Matemática",
"Português",
"Química",
]


const weekdays = [
"Domingo",
"Segunda-feira",
"Terça-feira",
"Quarta-feira",
"Quinta-feira",
"Sexta-feira",
"Sábado",
]

const title = "hello world from Nunjucks"

//Functionallities

function getSubject(subjectNumber){
    const position = +subjectNumber-1
    return subjects[position]
}
function pageLanding(req, res){
    return res.render("index.html") //sem nunjucks -> res.sendFile(__dirname + "/views/index.html")
}

function pageStudy(req,res){
    console.log(req.query) //verificar tudo o que está após a barra - req.query
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req,res){
    const data = req.query
    //adicionar dados a lista de proffys

    console.log(data)
    //console.log(proffys)
    
    if(Object.keys(data).length != 0){//se dado não estiver vazio
        //console.log("/n/n/n/entrei aqui")
        data.subject = getSubject(data.subject)
        proffys.push(data)
        //console.log(proffys)
        
    }    


    return res.render("give-classes.html", {subjects, weekdays})
    //return res.redirect("/study")
}

//Server creation
const express = require('express')
const server = express()


//configurar nunjucks 
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})

//início e configuração do servidor
server
    //configurar arquivsos estáticos (css, scripts, imagens)
    .use(express.static("public"))//configuraçao
    
    //rotas da aplicação
    .get("/", pageLanding)// .get("/give-classes", (req, res) => {return res.sendFile(__dirname + "/views/give-classes.html")})
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses) 

    .listen(5500)

    