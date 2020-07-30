//Estructura de los usuarios que voy a ir guardando
//qué datos voy a guardar de los usuarios

const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    sexo: String,
    nombre: String,
    direccion: String,
    usuario: String,
    contrasena: String

});

module.exports = model('user', userSchema); //creamos el modelo nombre (para un usuario) y el esquema
//module.exports = model('User', userSchema, 'users');