var Bicicleta = require('../../models/bicicleta');

//antes de cada test limpia colecciones

beforeEach(() => {Bicicleta.allBicis = [] });

//poner nombre del metodo que estoy testeando
describe('Bicicleta.allBicis', () => {
    //que quiero probar
    it('comienza vacia', () => {
        //qué está esperando
        expect(Bicicleta.allBicis.length).toBe(0);
    })
})

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(2, 'blanca', 'urbana', [-34.566932, -58.3808287]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    })
})

//resetear la coleccion entre cada test

describe('Bicicleta.finById', () => {
    it('debe devolver la bici con id 1', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "verde", "urbana");

        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    })
})