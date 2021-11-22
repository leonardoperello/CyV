let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const fetch = require("node-fetch-npm");
chai.use(chaiHttp);

describe("test de estados: ", () => {
  // caso de TEST 1
  it("esperando tareas", async () => {
    const resTarea = await fetch(
      "http://localhost:8081/estado/613e6361b21rrrrrr53ee73d786bc9"
    );
    const tareas = await resTarea.text();
    console.log(tareas);
    expect(resTarea.status).to.be.equal(400);
  });
  //CASO DE TEST 2
  it("esperando tipos de estado", async () => {
    const resTarea = await fetch(
      "http://localhost:8081/estado/613bc8c397d979667ca2a137"
    );
    expect("Content-Type", /json/);
    expect(resTarea.status).to.be.equal(200);

    const res = await fetch("http://localhost:8081/estado/tipoEstados");
    expect("Content-Type", /json/);
    expect(res.status).to.be.equal(400);

  });
  //CASO DE TEST 3
  it("Esperando registrar cambio de estado", async () => {
    const resTarea = await fetch(
      "http://localhost:8081/estado/613bc8c397d979667ca2a137"
    );
    const tareas = await resTarea.json();
    expect("Content-Type", /json/);
    expect(resTarea.status).to.be.equal(200);

    const res = await fetch("http://localhost:8081/estado/tipoEstado");
    const tiposEstado = await res.json();
    expect(res.status).to.be.equal(200);

    const data = {
      idOti: '613e6361b21rrrrrr53ee73d786bc9',
      idTarea: 123,
      nombreSector: 'taller',
      observacion: "caso de test",
      tipoEstado: null,
    };

    const resCrearestado = await fetch("http://localhost:8081/estado", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const estadoNUevo = await resCrearestado.text();
    console.log(estadoNUevo);
    expect(resCrearestado.status).to.be.equal(404);



  });


  //caso de TEST 4 
  it("cambio de estado operario", async () => {
    const resTarea = await fetch(
      "http://localhost:8081/estado/613bc8c397d979667ca2a137"
    );
    const tareas = await resTarea.json();
    expect("Content-Type", /json/);
    expect(resTarea.status).to.be.equal(200);

    const res = await fetch("http://localhost:8081/estado/tipoEstado");
    const tiposEstado = await res.json();
    expect("Content-Type", /json/);
    expect(res.status).to.be.equal(200);

    const data = {
      idOti: tareas.idOti,
      idTarea: tareas.tareasOperario[1]._id,
      nombreSector: tareas.tareasOperario[1].sector.nombre,
      observacion: "caso de test",
      tipoEstado: tiposEstado[4],
    };

    const resCrearestado = await fetch("http://localhost:8081/estado", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const estadoNUevo = await resCrearestado.json();
    expect("Content-Type", /json/);
    expect(resCrearestado.status).to.be.equal(200);
  });


});
