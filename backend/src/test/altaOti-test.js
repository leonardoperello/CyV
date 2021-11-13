let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

//----------------------tests del diagrama------------------------

describe("Deberia cargar una nueva OTI: ", () => {
  it("Deberia funcionar y crear una OTI ", (done) => {
    console.log("primera ruta: buscar ordenes");
    let parameter = "2021-10-13";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end((err, orden) => {
        console.log("ruta de buscar roscas");
        let ordenes = orden.body[0];
        console.log(ordenes);
        let idOrden = ordenes.id;
        //busco roscas
        chai
          .request(url)
          .get("/oti/obtenerRoscas/" + idOrden)
          .end((err, roscas) => {
            console.log("ruta de crear OTI");
            let roscaBody = roscas.body[0];
            console.log(roscaBody);
            //creo la OTI
            chai
              .request(url)
              .post("/oti/datosBasicos")
              .send({
                fechaI: "2021-11-08",
                rosca: roscaBody,
              })
              .end((err, oti) => {
                console.log("primera ruta sectores y ventas");
                console.log(oti.body);
                idOti = oti.body._id;
                sector = {
                  _id: "613bc8d2b2153ee73d455fe7",
                  nombre: "corte",
                  activo: true,
                };
                tareas = [
                  {
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
                  },
                ];
                // creo sector y tareas 1
                chai
                  .request(url)
                  .put("/oti/sectoresYTareas")
                  .send({
                    id: idOti,
                    sector,
                    tareas,
                  })
                  .end((err, segundaOTI) => {
                    console.log("segunda ruta sectores y ventas");
                    console.log(segundaOTI.body);
                    idOti = segundaOTI.body._id;
                    // creo sector y tareas 2
                    chai
                      .request(url)
                      .put("/oti/sectoresYTareas")
                      .send({
                        id: idOti,
                        sector: {
                          _id: "613bc8d2b2153ee73d455fe7",
                          nombre: "deposito",
                          activo: false,
                        },
                        tareas: [
                          {
                            descripcion: "tarea 1",
                            nombre: "tarea nueva1",
                            fechaI: "",
                            fechaF: "",
                            tipoDeTarea: {
                              nombre: "tarea5",
                              descripcion: "descripcion_5",
                            },
                            sector: { nombre: "deposito" },
                            idOperario: "",
                            nombreEstado: "iniciada",
                            descripcionEstado: "se inicializo correctamente",
                          },
                        ],
                      })
                      .end((err, tercerOTI) => {
                        console.log("ruta actualizar orden");
                        console.log(tercerOTI.body._id);
                        id = tercerOTI.body._id;
                        // actualizo orden
                        chai
                          .request(url)
                          .put("/oti/actualizarOrden/")
                          .send({
                            idOti: id,
                            idOrden: "613e597ecb4275f300506786",
                            fechaI: "2021-11-07",
                          })
                          .end(function (err, res) {
                            console.log(res.text);
                            expect(res).to.have.status(200);
                            done();
                          });
                      });
                  });
              });
          });
      });
  });
});

describe("Deberia fallar en la busqueda de ordenes: ", () => {
  it("Deberia fallar en la busqueda de ordenes", (done) => {
    console.log("primera ruta: buscar ordenes");
    let parameter = "2023-10-10";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end((err, res) => {
        console.log(res.text);
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Deberia fallar en la busqueda de las roscas: ", () => {
  it("Deberia fallar en la busqueda de las roscas", (done) => {
    console.log("primera ruta: buscar ordenes");
    let parameter = "2021-10-12";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end((err, orden) => {
        console.log("ruta de buscar roscas");
        let ordenes = orden.body[0];
        console.log(ordenes);
        let idOrden = ordenes.id;
        console.log(idOrden);
        //busco roscas
        chai
          .request(url)
          .get("/oti/obtenerRoscas/" + "123123")
          .end((err, res) => {
            console.log(res.text);
            expect(res).to.have.status(400);
            done();
          });
      });
  });
});

describe("Deberia fallar en la creación de la OTI: ", () => {
  it("Deberia fallar en la creación de la OTI", (done) => {
    console.log("primera ruta: buscar ordenes");
    let parameter = "2021-10-12";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end((err, orden) => {
        console.log("ruta de buscar roscas");
        let ordenes = orden.body[0];
        console.log(ordenes);
        let idOrden = ordenes.id;
        //busco roscas
        chai
          .request(url)
          .get("/oti/obtenerRoscas/" + idOrden)
          .end((err, roscas) => {
            console.log("ruta de crear OTI");
            let rosca = roscas.body;
            console.log(rosca);
            //creo la OTI
            chai
              .request(url)
              .post("/oti/datosBasicos")
              .send({
                fechaI: "2021-11-08",
                rosca,
              })
              .end((err, res) => {
                console.log(res.text);
                expect(res).to.have.status(400);
                done();
              });
          });
      });
  });
});

describe("Deberia fallar en la creaciónd de tareas: ", () => {
  it("Deberia fallar en la creación de tareas", (done) => {
    console.log("primera ruta: buscar ordenes");
    let parameter = "2021-10-13";
    chai
      .request(url)
      .get("/oti/obtenerOrdenes/" + parameter)
      .end((err, orden) => {
        console.log("ruta de buscar roscas");
        let ordenes = orden.body[0];
        console.log(ordenes);
        let idOrden = ordenes.id;
        //busco roscas
        chai
          .request(url)
          .get("/oti/obtenerRoscas/" + idOrden)
          .end((err, roscas) => {
            console.log("ruta de crear OTI");
            let rosca = roscas.body;
            console.log(rosca);
            //creo la OTI
            chai
              .request(url)
              .post("/oti/datosBasicos")
              .send({
                fechaI: "2021-11-08",
                rosca,
              })
              .end((err, oti) => {
                console.log("ruta de crear tareas");
                idOti = oti.body._id;
                chai
                  .request(url)
                  .put("/oti/sectoresYTareas/")
                  .send({ idOti, sector: {}, tareas: [] })
                  .end(function (err, res) {
                    console.log(res.text);
                    expect(res).to.have.status(400);
                    done();
                  });
              });
          });
      });
  });
});
