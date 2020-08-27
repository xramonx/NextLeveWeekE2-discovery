//desestruturar objeto  - retirar de format o próprio objeto inteiro
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
const Database = require('./database/db')

//Fucntionalities
function pageLanding(req, res) {
    return res.render("index.html") //sem nunjucks -> res.sendFile(__dirname + "/views/index.html")
}

async function pageStudy(req, res) {
    //console.log(req.query) //verificar tudo o que está após a barra - req.query
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })
    }
    console.log('Não tem campos vazios')


    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
    SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON ( classes.proffy_id = proffys.id )
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })
        
        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
    //return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    // const data = req.body
    // //adicionar dados a lista de proffys

    // console.log(data)
    // //console.log(proffys)

    // if (Object.keys(data).length != 0) {//se dado não estiver vazio
    //     //console.log("/n/n/n/entrei aqui")
    //     data.subject = getSubject(data.subject)

    //     //adicionar data a lista de proffys
    //     proffys.push(data)
    //     //console.log(proffys)
    //     return res.redirect("/study")
    // }
    //se não, mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
    //return res.redirect("/study")
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,

    }

    const classScheduleValues = req.body.weekday.map(
        (weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }
        }
    )

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        //console.log(data)
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}