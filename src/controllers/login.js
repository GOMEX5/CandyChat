const {render} = require('ejs');
const conexion = require('../database/db');
const bcryptjs = require('bcryptjs');

exports.login = (req,res)=>{
    res.render('login',{title:'CandyChat/Login'});
};

exports.registro = (req,res)=>{
    res.render('registro',{title:'CandyChat/Register'});
};

exports.registrar = async(req,res)=>{
    const user = req.body.user;
    const email = req.body.email;
    const phone = req.body.phone;
    const pass = req.body.pass;
    let password = await bcryptjs.hash(pass,8);
    conexion.query('INSERT INTO pass SET ?',{name:user,pass:password,email:email,phone:phone}, async(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('home',{title:'CandyChat'});
        }
    });
};

exports.logiar = async(req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        conexion.query('SELECT * FROM pass WHERE name = ?', [user], async(error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.send('error');
            }else{
                req.session.loggedin = true; 
                const id = results[0].id;
                req.session.cod = id;               
                req.session.name = results[0].name;
                req.session.email = results[0].email;
                req.session.phone = results[0].phone;
                res.redirect('/');
            }
        });
    }
}

exports.logout = (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}