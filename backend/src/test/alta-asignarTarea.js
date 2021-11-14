let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("Testeando los casos correctos de alta asignar tarea: ", () => {
  it("Enviando nombre del sector para obtener las otis", (done) => {
    chai
      .request(url)
      .get("/tarea/obtenerOtis/?id=deposito")
      .end(function (err, res) {
        console.log(res.error.text);
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Enviando id de oti para obtener tareas", (done) => {
    chai
      .request(url)
      .get("/tarea/obtenerTareas/?id=617859e5e672ca8debe56ca7")
      .end(function (err, res) {
        // console.log(res.error.text);
        expect(res).to.have.status(200);
        done();
      });
  });
});
