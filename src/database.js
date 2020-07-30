//Conexion a la BD
const mongoose = require('mongoose'); //este modulo en una constante del mismo nombre y usarlo para conectarma

//nos conectamos a la BD que la llamamos Login
mongoose.connect('mongodb://localhost/Login', {
        useNewUrlParser: true, //parametros que pide para que no salga error, config que tiene mongoose
        useUnifiedTopology: true

    }) //, con los parametros de conexion
    .then(db => console.log('Conectado a la BD'))
    .catch(err => console.log(err));