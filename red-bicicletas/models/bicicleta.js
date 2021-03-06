var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//se agrega bicicleta schema desde mongoose
var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        //pasamos otro json para identificar el numero
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
})
//crea instancia estatico
bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color:color,
        modelo:modelo,
        ubicacion: ubicacion
    })
}

bicicletaSchema.methods.toString = function () {
    return `code: ${this.code}  | color: ${this.color}`
}
//orden de las bicicletas, static agrega directo a la BD
bicicletaSchema.statics.allBicis = function (cb) {
    //pasa por parametro el filtro y el callback
    return this.find({}, cb)
}

bicicletaSchema.statics.add = function (aBici, cb) {
    this.create(aBici, cb)
}
//pasamos un codigo y el callback, trae el primero que encuentre y el criterio de 
//filtrado es el codigo
bicicletaSchema.statics.findByCode = function (aCode, cb) {
    return this.findOne({ code: aCode }, cb)
}

bicicletaSchema.statics.removeByCode = function (aCode, cb) {
    return this.deleteOne({ code: aCode }, cb)
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);

/*var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + "| color:" +this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function (aBici){
    Bicicleta.allBicis.push(aBici);
}

//busqueda del elemento

Bicicleta.findById = function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    console.log(aBici)
    if (aBici)
        return aBici;
    else
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);

}

//metodo para eliminar
Bicicleta.removeById = function(aBiciId){
    for(var i=0; i< Bicicleta.allBicis.length;i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

//var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
//var b = new Bicicleta(2, 'blanca', 'urbana', [-34.566932, -58.3808287]);

//Bicicleta.add(a);
//Bicicleta.add(b);

module.exports = Bicicleta;*/
