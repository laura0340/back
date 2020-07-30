// Iniciar el servidor backend
const express = require('express'); //modulo express y guardamos en una constante
const app = express(); //devuelve un objeto para el servidor
const cors = require('cors');

require('./database'); //aca requerimos la conexion  a mongo
//app.set('port', process.env.PORT || 4200);
app.use(cors()); //para comunicar un servidor con otrso servidores
app.use(express.json()); //para que convierta los objetos Json a otro en javaS qeu podemos manipular

//importamos la ruta 
app.use('/api', require('./rutas/index'));
app.listen(3000);
//app.listen(app.get('port')); //iniciamos la aplicación escuchando por el puerto 3000
//console.log('Server on port', app.get('port')); //mensaje por consola
console.log('Server on port', 3000); //mensaje por consola