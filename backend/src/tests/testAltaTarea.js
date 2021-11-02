"use strict"
var assert = require('assert');
var request = require('supertest')
var app = require('/app.js')

var request = request("http://localhost:8081")

describe('tareas', function() {
    describe('GET', function(){
        // ???? alta tarea se llama desde OTI
        it('Debe retornar un json como formato por defecto', function(done){
            request.get('/oti/sectoresYTareas')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});