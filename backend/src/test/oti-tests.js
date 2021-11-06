let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("tests de la OTI: ", () => {
  it("deberia traer todas las ordenes en la fecha 2021-10-13 ", (done) => {
    let parameter = "2021-10-13";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.not.be.undefined;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("deberia traer todas las roscas de una orden de produccion ", (done) => {
    let parameter = "613e597ecb4275f300506786";
    chai
      .request(url)
      .get("/oti/obtenerRoscas/" + parameter)
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.not.be.undefined;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("deberia crear una nueva OTI ", (done) => {
    let rosca = {
      id: "616e3f364ce714735d5f67a7",
      descripcionTecnica: "es una rosca dificil de hacer",
      medida: "20x50x10",
      tipoDeRosca: {
        descripcion: "descripcion_4",
        nombre: "weich",
        categoria: {
          nombre: "premium",
          descripcion: "exportacion marina y utilizacion para caños de gas",
          _id: "616e3f364ce714735d5f67a9",
        },
        _id: "616e3f364ce714735d5f67a8",
      },
    };

    chai
      .request(url)
      .post("/oti/datosBasicos/")
      .send({ fechaI: "2023/10/18", rosca })
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
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
