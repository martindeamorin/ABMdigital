var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
var dirname = path.join(__dirname, '../data/database.json');
var database = JSON.parse(fs.readFileSync(dirname, "utf-8"))

var productsController = {
    mostrarProductos : function(req, res, next) {
        res.render('products', {database})
    },
    mostrarCreate : function(req, res){
        res.render('create');
    },

    create : function(req, res, next) {
    let object = req.body;
    let id = 0;
        if(database[0] == undefined){
            database.push(object);
            database[0].id = 1;
        } else{
        for(let i = 0; i < database.length; i++){
        if(!database[i+1]){
                id = parseInt(database[i].id, 10) + 1;
        }
        }
        object.id = id;
        database.push(object);
    }
        let databaseJSON = JSON.stringify(database);
        fs.writeFileSync(dirname, databaseJSON);
        res.send("Se ha creado con exito el producto: " + req.body.nombre)
    },
    mostrarEdit : function(req, res){
    let editable; 
        for(let i = 0; i < database.length; i++){
            if(database[i].id == req.params.id){
                editable = database[i];
            }
        }
        if(!editable){
        res.send("No se pudo encontrar un producto con el ID: " + req.params.id)
        }else{
        res.render("edit", {editable})
        }
},
    edit : function(req, res){
        for(let i = 0; i < database.length; i++){
            if(database[i].id == req.params.id){
            database[i] = {...req.body, id : req.params.id};
            }
        }
        let databaseJSON = JSON.stringify(database);
        fs.writeFileSync(dirname, databaseJSON);
        res.redirect("/products/edit/" + req.params.id)
    },
    delete : function(req, res){
    let filtro = database.filter(function(em){
        return em.id != req.params.id;
    });
    if(filtro.length == database.length){
    res.send("No se pudo encontrar un producto con el ID: " + req.params.id)
    }else{
    let databaseJSON = JSON.stringify(filtro);
    fs.writeFileSync(dirname, databaseJSON);
    res.send("Se ha eliminado el producto");
    }
    }
}

module.exports = productsController;