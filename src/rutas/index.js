//rutas del servidor

const { Router } = require('express'); //
const router = Router(); // ejecutamos la funcion llamada Router

const User = require('../models/User'); //importamos el modelo del usuario para las acciones consultas

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello word'); // ruta inicial y respondemos con ese mensaje
});
//ruta para registrar
router.post('/registrarse', async(req, res) => {
    const { sexo, nombre, direccion, usuario, contrasena } = req.body; //me muestra el cuerpo de la peticion
    console.log(sexo, nombre, direccion);
    const newUser = new User({ sexo, nombre, direccion, usuario, contrasena }); //se crea el usuario
    //console.log(newUser);
    await newUser.save(); // para ir haciendo otras cosas el servidor sin interrumpir esto
    //creamos un token 
    //sign tiene 3 parame (dato a guardar, palbara secreta, opciones)
    const token = await jwt.sign({ _id: newUser._id }, 'clave');
    res.status(200).json({ token }); //devuelcvo el token a el cliente
    res.send('registrarse');
});

//ruta para ingresar
router.post('/ingresar', async(req, res) => {
    const { usuario, contrasena } = req.body; //me muestra el cuerpo de la peticion
    const user = await User.findOne({ usuario });
    // const users = await User.findOne({ usuario });
    //console.log(user);
    //res.render('infoUsuario', { user });


    if (!user) return res.status(401).send('El correo no se encuentra, debe registrarse');
    if (user.contrasena !== contrasena) return res.status(401).send('La contraseña es incorrecta');
    const token = jwt.sign({ _id: user._id }, 'clave');
    const nombre = jwt.sign({ nombre: user.nombre }, 'clave');
    const direccion = jwt.sign({ direccion: user.direccion }, 'clave');
    const sexo = jwt.sign({ sexo: user.sexo }, 'clave');
    res.send(nombre, direccion, sexo);

    return res.status(200).json({ token }); //devuelcvo el token a el cliente

    /*return res.json([{
        nombre,
        direccion,
        sexo,
        token
    }]);*/
});

//rutas para devolver datos de forma privada
router.get('/infoUsuario', verifyToken, async(req, res) => {

    const user = await User.find({}); //me los trae todos los de la BD
    console.log(user);
    res.render('infoUsuario', { user });

    /*res.json([{
        nombre: 'nombre',
        direccion: 'direccion',
        sexo: 'sexo',
    }]);*/
});

//funcion de validacion para devolver la info 
async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('No está autorizado');
        }
        let token = req.headers.authorization.split(' ')[1]; //agarro el toquen 
        if (token === 'null') { //verifico que el token no esté vacío
            return res.status(401).send('No está autorizado');
        }

        const payload = await jwt.verify(token, 'clave'); //obtenemos los datos que están dentro del token
        if (!payload) {
            return res.status(401).send('No está autorizado');
        }
        req.userId = payload._id; //guarda el id del usuraio
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send('No está autorizado');
    }
}

module.exports = router;