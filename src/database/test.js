const Database = require('./db.js')//.js é opcional
const createProffy = require('./createProffy')

//continuação após (async permite utilizar await)
Database.then(async (db) => {

    //inseir dados
    proffyValue = {
        name: 'Ramon Menezes',
        avatar: 'https://avatars0.githubusercontent.com/u/67943563?s=460&u=3db116f7836a86ed23c238ed0177021b8d51647e&v=4',
        whatapp: '4198767-8046',
        bio: 'engenheiro eletronico formado pela UTFPR',

    }

    classValue = {
        subject: 2,
        cost: '30',
        //profy_id será criado pelo banco de dados
    }

    classScheduleValues = [
        {
            //classid virá pelo banco de dados, após cadastrar a class
            weekday: [0],
            time_from: [720],
            time_to: [1220]
        },

        {
            weekday: [0],
            time_from: [520],
            time_to: [1220]
        }
    ]


     //await createProffy(db, {proffyValue, classValue, classScheduleValues})


    //Consultar os dados inseridos

      //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)


    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)


    //o horário que a pessoa trabalha, por exemplo, das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado 
    //o time_to precisa ser acima 

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <="620"
        AND class_schedule.time_to > 900
        
    `)

    console.log(selectClassesSchedules)

})