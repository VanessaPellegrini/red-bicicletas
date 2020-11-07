var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

//los test deben ser claros con lo que buscan testear
//nos conectamos y eliminamos todo

describe('Testing Bicicletas', function () {

    beforeEach(function (done) {
        setTimeout(function () {
            var mongoDB = 'mongodb://localhost/testdb'
            mongoose.connect(mongoDB, { useNewUrlParser: true })
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function () {
                console.log('We are connected to test database!');
            });
            done();
        }, 100);
    });


    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            done();
            if (err) console.log(err);
        });
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34.5);
            expect(bici.ubicacion[1]).toEqual(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            //nueva bicicleta
            var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
            Bicicleta.add(aBici, function (err, newBici) {
                if (err) console.log(err);
                //la coleccion debe tener una longitud = 1
                Bicicleta.allBicis(function (err, bicis) {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe de devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function (err, bicis) {
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbana" });
                Bicicleta.add(aBici, function (err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({ code: 2, color: "roja", modelo: "deportiva" });
                    Bicicleta.add(aBici2, function (err, newBici) {
                        if (err) console.log(err);

                        Bicicleta.findByCode(1, function (error, targetBici) {
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        });
                    });
                });
            });

        });
    });

});


/*
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
})*/