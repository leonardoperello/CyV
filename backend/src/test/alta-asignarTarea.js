let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const fetch = require("node-fetch-npm");
chai.use(chaiHttp);

describe("Test de asignar tarea: ", () => {
  // tratando de obtener los operarios de un sector que no existe
  it('GET: sector inexiste para obtener otis', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOperarios = await fetch(
      "http://localhost:8081/operario/operarioSector/recursos"
    );
    const operarios = await resOperarios.text();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(400);
  });

  // tratando de obtener las otis de un sector que no existe
  it('GET: sector inexiste para obtener otis', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOperarios = await fetch(
      "http://localhost:8081/operario/operarioSector/deposito"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const resOtis = await fetch(
      "http://localhost:8081/tarea/obtenerOtis/recursos"
    );
    const oti = await resOtis.text();
    expect(resOtis.status).to.be.equal(400);
  });

  // tratando de obtener las tareas con un id de oti erroneo
  it('GET: idOti con longitud distinta', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOperarios = await fetch(
      "http://localhost:8081/operario/operarioSector/deposito"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const resOtis = await fetch(
      "http://localhost:8081/tarea/obtenerOtis/deposito"
    );
    const oti = await resOtis.json();
    expect("Content-Type", /json/);
    expect(resOtis.status).to.be.equal(200);

    const resTareas = await fetch(
      "http://localhost:8081/tarea/obtenerTareas/6171a0d12eb932057569b58"
    );
    const tareas = await resTareas.text();
    expect(resTareas.status).to.be.equal(400);
  });

  // Tratando de asignar una tarea a un operario con parametros incorrectos
  it('POST: parametros incorrectos al asignar la tarea', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOperarios = await fetch(
      "http://localhost:8081/operario/operarioSector/deposito"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const resOtis = await fetch(
      "http://localhost:8081/tarea/obtenerOtis/deposito"
    );
    const oti = await resOtis.json();
    expect("Content-Type", /json/);
    expect(resOtis.status).to.be.equal(200);

    const resTareas = await fetch(
      "http://localhost:8081/tarea/obtenerTareas/6171a0d12eb932057569b586"
    );
    const tareas = await resTareas.json();
    expect("Content-Type", /json/);
    expect(resTareas.status).to.be.equal(200);

    const data = {
      observacion: 123,
      idOti: 123456789,
      idOperario: 987654321,
      tareas: 'Tarea_1, Tarea_2'
    };

    const resAsignarTarea = await fetch("http://localhost:8081/tarea/asignarTarea", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const asignarTarea = await resAsignarTarea.text();
    expect(resAsignarTarea.status).to.be.equal(400);

  });

  // CASO FELIZ
  it('POST: asignacion correcta de tarea a operario', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOperarios = await fetch(
      "http://localhost:8081/operario/operarioSector/deposito"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const resOtis = await fetch(
      "http://localhost:8081/tarea/obtenerOtis/deposito"
    );
    const oti = await resOtis.json();
    expect("Content-Type", /json/);
    expect(resOtis.status).to.be.equal(200);

    const resTareas = await fetch(
      "http://localhost:8081/tarea/obtenerTareas/6171a0d12eb932057569b586"
    );
    const tareas = await resTareas.json();
    expect("Content-Type", /json/);
    expect(resTareas.status).to.be.equal(200);

    const data = {
      observacion: 'Observacion_1',
      idOti: oti[1].idOti,
      idOperario: operarios[0]._id,
      tareas: tareas
    };

    const resAsignarTarea = await fetch("http://localhost:8081/tarea/asignarTarea", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const asignarTarea = await resAsignarTarea.json();
    expect("Content-Type", /json/);
    expect(resAsignarTarea.status).to.be.equal(200);

  });
});
