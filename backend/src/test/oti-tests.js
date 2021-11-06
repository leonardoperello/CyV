let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("tests de la OTI: ", () => {
  /*it("deberia obtener todas las ordenes", (done) => {
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/2021-05-10")
      .end(function (err, res) {
        console.log(res.body);
        expect(res.body).to.have.property("fecha").to.be.equal("2021-05-10");
        expect(res).to.have.status(200);
        done();
      });
  });*/
  describe("get todos los sectores: ", () => {
    it("debería traer todos los sectores", (done) => {
      chai
        .request(url)
        .get("/oti/sectores")
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("get todas las ordenes en una fecha: ", () => {
    it("deberia traer todas las ordenes en la fecha 2021-10-13 ", (done) => {
      chai
        .request(url)
        .get("/oti/obtenerOrdenes/2021-10-13")
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
