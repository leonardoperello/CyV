let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("test de estados: ", () => {

    const data = {
        idOti:'616f2980c5e1d1846975c8cd',
        idTarea:"616f2980c5e1d1846975c8e7",
        nombreSector:"torneria",
        observacion : "hola profes",
        tipoEstado :{
        nombre : "finalizada",
        descripcion : ""
    }
    }

    it("debería traer todas las tareas de los operario", (done) => {
      chai
        .request(url)
        .get("/estado/613e626ab2153ee73d77fb1d")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("coleccion de tipos de Estados", (done) => {
        chai
          .request(url)
          .get("/estado/tipoEstado")
          .end(function (err, res) {
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