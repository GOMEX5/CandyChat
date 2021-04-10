const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CadyChatDB'
});

conexion.connect((error)=>{
    if(error){
        console.error('el error es: '+error);
        return
    }
    console.log('Conectado a la DB');
});

module.exports = conexion;