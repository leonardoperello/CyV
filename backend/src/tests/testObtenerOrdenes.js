"use strict"
var assert = require('assert');
var request = require('supertest')
var app = require('/app.js')

var request = request("http://localhost:8081")

describe('oti', function() {
    describe('GET', function(){
        it('Debe retornar un json como formato por defecto', function(done){
            let orden = {fecha: "2021-10-03"} 
            request.get('/oti/obtenerOrdenes/:fecha')
            .send(orden)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe('GET', function(){
        it('Debe retornar un json como formato por defecto', function(done){
            let orden = {idOrden: "613e597ecb4275f300506786"} 
            request.get('/oti/obtenerRoscas/:idOrden')
            .send(orden)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});