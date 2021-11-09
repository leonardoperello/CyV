let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const fetch = require("node-fetch-npm");
chai.use(chaiHttp);

const url = "http://localhost:8081";
describe("test de estados: ", () => {
  //CASO FELIZ
  it.only('cambio de estado operario', async () => {
    const resTarea = await fetch('http://localhost:8081/estado/613e6361b2153ee73d786bc9');
    const tareas = await resTarea.json();
    console.log(tareas);
    expect('Content-Type', /json/);
    expect(resTarea.status).to.be.equal(200);


    const res = await fetch('http://localhost:8081/estado/tipoEstado');
    const tiposEstado = await res.json();
    console.log(tiposEstado);
    expect('Content-Type', /json/);
    expect(res.status).to.be.equal(200);

    const data = {
      idOti: tareas.idOti,
      idTarea: tareas.tareasOperario[0]._id,
      nombreSector: tareas.tareasOperario[0].sector.nombre,
      observacion: "hola profes",
      tipoEstado: tiposEstado[1]
    }

    const resCrearestado = await fetch('http://localhost:8081/estado', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    });
    const estadoNUevo = await resCrearestado.json();
    console.log(estadoNUevo);
    expect('Content-Type', /json/);
    expect(resCrearestado.status).to.be.equal(200);


  });

  //CASOS DE ERROR
  it("caso defectuoso pruebo como funciona el control de longitud de id", (done) => {
    chai
      .request(url)
      .get("/estado/613e626ab2153ee73d77fb1d44444")
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });


});
