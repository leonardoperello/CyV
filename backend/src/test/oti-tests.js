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
  it("debería cargar un sector y sus tareas", (done) => {
    let sector = {
      _id: "613bc8d2b2153ee73d455fe7",
      nombre: "corte",
      activo: true,
    };
    // la fecha la dejo nula porque eso se debe modificar posteriormente
    let tareas = {
      descripcion: "tarea 1",
      nombre: "tarea nueva1",
      fechaI: "",
      fechaF: "",
      tipoDeTarea: {
        nombre: "tarea5",
        descripcion: "descripcion_5",
      },
      sector: { nombre: "corte" },
      idOperario: "",
      nombreEstado: "iniciada",
      descripcionEstado: "se inicializo correctamente",
    };
    chai
      .request(url)
      .put("/oti/sectoresYTareas/")
      .send({ id: "618843c2ae9cefbf19050627", sector, tareas })
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("debería actualizar la orden de producción con la oti", (done) => {
    chai
      .request(url)
      .put("/oti/actualizarOrden/")
      .send({
        idOti: "61892a2dfd36fcec4c9bd251",
        idOrden: "61889bc26e14e867574dd7bd",
        fechaI: "2021-11-07",
      })
      .end(function (err, res) {
        console.log(res.text);
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
  it("deberia fallar porque no hay roscas en esa orden ", (done) => {
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
  it("debería fallar al cargar un sector y sus tareas", (done) => {
    let sector = {
      _id: "613bc8d2b2153ee73d455fe7",
      nombre: "corte",
      activo: "asd",
    };
    // la fecha la dejo nula porque eso se debe modificar posteriormente
    let tareas = {
      descripcion: "tarea 1",
      nombre: "tarea nueva1",
      fechaI: "",
      fechaF: "",
      tipoDeTarea: {
        nombre: "tarea5",
        descripcion: "descripcion_5",
      },
      sector: { nombre: "corte" },
      idOperario: "",
      nombreEstado: "iniciada",
      descripcionEstado: "se inicializo correctamente",
    };
    chai
      .request(url)
      .put("/oti/sectoresYTareas/")
      .send({ id: "618843c2ae9cefbf19050627", sector, tareas })
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
  it("debería fallar al actualizar la orden de producción con la oti", (done) => {
    chai
      .request(url)
      .put("/oti/actualizarOrden/")
      .send({
        idOti: "618843c2ae9cefbf19050627",
        idOrden: "613e597ecb4275f300506786",
        fechaI: "2021/11/07",
      })
      .end(function (err, res) {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
});
