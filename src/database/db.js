const Database = require('sqlite-async')
//Database.open(__dirname + '/database.sqlite').then(function (){})



//In order to run it on bash console: "node src/database/db.js"
function execute(db){
    // console.log(db) //debug
    
    //as instruções vão dentro das crases
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            avatar TEXT, 
            whatsapp TEXT, 
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER, 
            cost TEXT, 
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER, 
            weekday INTEGER, 
            time_from INTEGER, 
            time_to INTEGER
        );
    
    
    `)
    


}

//module.exports allows to export Database in otherfiles using "require"
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)