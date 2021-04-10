const {render} = require('ejs');
const conexion = require('../database/db');

exports.home = (req,res)=>{
    if(req.session.loggedin){
        res.render('home',{
            title: 'CandyChat',
            login: true,
            name: req.session.name
        });
    }else{
        res.render('home', {
            title: 'CandyChat',
            login: false,
            name: 'debe iniciar sesion'
        })
    }
};

exports.perfil = (req,res)=>{
    if(req.session.loggedin){
        res.render('perfil',{
            title: 'CandyChat',
            login: true,
            name: req.session.name,
            email: req.session.email,
            phone: req.session.phone
        });
    }else{
        res.render('home', {
            title: 'CandyChat',
            login: false,
            name: 'debe iniciar sesion'
        })
    }
};

exports.editar_perfil = (req,res)=>{
    const {dato} = req.params;
    if(req.session.loggedin){
        res.render('editar_perfil',{
            title: 'CandyChat',
            login: true,
            dato : dato,
            id: req.session.cod,
            name: req.session.name,
            email: req.session.email,
            phone: req.session.phone
        });
    }else{
        res.redirect('/');
    }
};

exports.updateName = (req,res)=>{
    const {id} = req.params;
    const name = req.body;
    req.session.name = name.name;
    if(name){
        conexion.query('UPDATE pass set ? WHERE id = ?',[name,id],(error,result)=>{
            res.redirect('/perfil')
        })
    }
};

exports.updateEmail = (req,res)=>{
    const {id} = req.params;
    const email = req.body;
    req.session.email = email.email;
    if(email){
        conexion.query('UPDATE pass set ? WHERE id = ?',[email,id],(error,result)=>{
            res.redirect('/perfil')
        })
    }
};

exports.updatePhone = (req,res)=>{
    const {id} = req.params;
    const phone = req.body;
    req.session.phone = phone.phone;
    if(phone){
        conexion.query('UPDATE pass set ? WHERE id = ?',[phone,id],(error,result)=>{
            res.redirect('/perfil')
        })
    }
};
