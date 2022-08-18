const express = require("express");
const computerSchema = require("../models/computer"); // importamos el modelo de cliente
//Este reouter es lo que voy a exportar de este archivo y emplear en el servidor
const router = express.Router();
//PARAMETROS: lo que se quiere poner para recoger informacion
//BODY: lo que se quiere escribir para añadir info

//cors

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
///GET all users///
router.get('/computers', (req,res) => {
    computerSchema //Cargamos el esquema ya creado en model de nuestro cliente
    .find() //empleamos find para encontrar
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error})); 
});

//GET 1 user by id (id no _id)
router.get("/computer/:id", (req,res) => { //a la url le añadimos un parámetro id para encontrar al usuario
    const { id } = req.params; //Extraemos el parámetro ID con req.params del IB objetc y con req.body del cuerpo tomamos el parámetro
    computerSchema 
    .find({id:id}) //Buscar por ID no objet (puede ser cualquier parámetro que le asignemos)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
}); 

//POST (create computer)
router.post('/computer', (req,res) => {//nombre de la ruta para crear un nuevo usuario de la API www./api/get
    const computer = computerSchema(req.body); //Añadimos el esquema de cliente
    //console.log(req.body); //Es la respuesta que nos dará
    computer
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error})); //Guarda el client y da uan respuesta y un error en caso de que no se guarde
}); 

//UPDATE a client by id (no id_ NO OBJECT)
router.put("/computer/:id", (req,res) => { //a la url le añadimos un parámetro id para encontrar al usuario
    //const { id } = req.params; //Extraemos el parámetro ID con req.params del IB objetc y con 

    const { id, name, age, money, buy} = req.body; //AQUI SE PRESENTA UN ERROR CON LA VARIABLE ID QUE LA BORRAMOS PORQUE SE CONFUDNE
    computerSchema 
    //quitamos el _id:id para que se pueda buscar por id no objetc, sino lo colocamos
    .updateOne({ id: req.params.id},{ $set: { id, name, age, money, buy} }) //Actualizar tomamos el par. de busqueda y luego los de cambio 
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error})); 
}); 
//DELETE a client
router.delete("/computer/:id", (req,res) => { //a la url le añadimos un parámetro id para encontrar al usuario
    const { id } = req.params; //Extraemos el parámetro ID con req.params del IB objetc y con req.body del cuerpo tomamos el parámetro
    computerSchema 
    .remove({id: id}) //eleimiar por id, si quieramos por ID objetc {_id:id}
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error})); 
}); 
 
//Get user by id
router.post('/computerid',  (req, res) => {
    computerSchema.find({id: req.body.id}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
  })

//GET 1 user by ID OBJECT:
/*
router.get("/client/:id", (req,res) => { //a la url le añadimos un parámetro id para encontrar al usuario
    const { id } = req.params; //Extraemos el parámetro ID con req.params del IB objetc y con req.body del es para poner el parametro
    clientSchema 
    .findById(id) //Buscar por ID
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error})); 
}); 
*/

module.exports = router;
