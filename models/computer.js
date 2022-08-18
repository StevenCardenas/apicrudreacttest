const mongoose = require("mongoose");
//Para que la API nos devuelva o postee algo debemos crear un modelo con los datos de nuestra BD
//Esquema para tomar datos de un usuario, modelo de datos
const computerSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String},
    price: { type: Number},
    model: { type: String}
},{collection: "computer"});
//una vez tenemos el esquema lo exportarmos:
module.exports = mongoose.model('computer', computerSchema);