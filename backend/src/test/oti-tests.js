let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("tests caso exito de la OTI: ", () => {
  it("deberia devolver las ordenes en una fecha ", (done) => {
    let parameter = "2021-10-13";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("deberia traer todas las roscas de una orden de produccion ", (done) => {
    let parameter = "6181b4637d1c86d79ef2a400";
    chai
      .request(url)
      .get("/oti/obtenerRoscas/" + parameter)
      .end(function (err, res) {
        console.log(res.body);
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
      .send({ fechaI: "2021-11-07", rosca })
      .end(function (err, res) {
        console.log(res.text);
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
  it("debería cargar un sector y algunas tareas", (done) => {
    chai
      .request(url)
      .get("/oti/sectoresYTareas")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});

//------------------------------------------------------------------------
// casos de fallo

describe("tests casos de falla de la OTI: ", () => {
  it("deberia fallar por fecha nula ", (done) => {
    let parameter;
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
  it("deberia fallar por fecha con formato diferente ", (done) => {
    let parameter = "123";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
  it("deberia fallar porque no hay ordenes en esa fecha ", (done) => {
    let parameter = "2022-11-07";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
  it("deberia fallar porque el id de la rosca esta mal ", (done) => {
    let parameter = "61676dd1e1c87f22ac5";
    chai
      .request(url)
      .get("/oti/obtenerRoscas/" + parameter)
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
  it.only("deberia fallar porque no hay roscas en esa orden ", (done) => {
    let parameter = "61676f4ee1c87f22ac5dc148";
    chai
      .request(url)
      .get("/oti/obtenerRoscas/" + parameter)
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("deberia fallar porque la rosca o la fecha estan mal", (done) => {
    let rosca = {};
    chai
      .request(url)
      .post("/oti/datosBasicos/")
      .send({ fechaI: "2023/10/18", rosca })
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
});
