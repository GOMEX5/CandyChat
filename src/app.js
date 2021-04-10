const path = require('path');
const morgan = require('morgan');
const session = require('express-session')
const router = require('./routers/router');
const express = require('express');
const app = express();

//setting
const puerto = (process.env.PORT || 3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//static File
app.use(express.static(path.join(__dirname,'public')));
app.use('/recursos', express.static(__dirname + '/public'));

//middlewar
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//router
app.use('/',router);

//server listenig
app.listen(puerto,()=>{
    console.log('SERVER LISTENIG http://localhost:'+puerto);
});