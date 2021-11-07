let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";
// tres casos de test valor limite en id 
//operario de otro sector
//reglas de cambio de estado .
describe("test de estados: ", () => {

    const data = {
        idOti:'616f2980c5e1d1846975c8cd',
        idTarea:"616f2980c5e1d1846975c8e7",
        nombreSector:"torneria",//controlar nombre del sector de tarea sea el sector de operario
        observacion : "hola profes",
        tipoEstado :{
        nombre : "finalizada",
        descripcion : ""
    }
    }

    it.only("debería traer todas las tareas de los operario", (done) => {
      chai
        .request(url)
        .get("/estado/613e626ab2153ee73d77fb1d")
        .end(function (err, res) {
          expect('Content-Type', /json/);
          expect(res).to.have.status(200);
          done();
        });
    });

    it("caso defectuoso pruebo como funciona el control de longitud de id", (done) => {
      chai
        .request(url)
        .get("/estado/613e626ab2153ee73d77fb1d44444")
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("coleccion de tipos de Estados", (done) => {
        chai
          .request(url)
          .get("/estado/tipoEstado")
          .end(function (err, res) {
            expect('Content-Type', /json/);
            expect(res).to.have.status(200);
            done();
          });
      });

      it("coleccion de tipos de Estados", (done) => {
        chai
          .request(url)
          .put("/estado")
          .send(data)
          .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
          });
      });

});