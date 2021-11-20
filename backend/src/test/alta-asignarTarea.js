let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const fetch = require("node-fetch-npm");
chai.use(chaiHttp);

describe("Test de asignar tarea: ", () => {
  // CASO FELIZ
  it.only('Asignar tarea a operario: asignacion correcta', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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

    const resOperarios = await fetch(
      "http://localhost:8081/operario"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

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

  // DISTINTOS CASOS PARA LOS CUALES FALLARIA

  // tratando de obtener las otis de un sector que no existe en el GET
  it.only('GET: sector inexiste', async () =>{
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

    const resOtis = await fetch(
      "http://localhost:8081/tarea/obtenerOtis/recursos"
    );
    const oti = await resOtis.text();
    // console.log(oti);
    expect(resOtis.status).to.be.equal(400);
  });

  // tratando de obtener las tareas con un id de oti erroneo en el GET
  it.only('GET: idOti con longitud distinta', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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
    // console.log(tareas);
    expect(resTareas.status).to.be.equal(400);
  });

  // tratando de asignar una tarea a un operario con un type de observacion numerico en el POST
  it.only('POST: atributo observacion con tipo numerico', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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

    const resOperarios = await fetch(
      "http://localhost:8081/operario"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const data = {
      observacion: 123,
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
    const asignarTarea = await resAsignarTarea.text();
    // console.log(asignarTarea);
    expect(resAsignarTarea.status).to.be.equal(400);

  });

  // tratando de asignar una tarea a un operario con un id de oti erroneo en el POST
  it.only('POST: atributo idOti con longitud distinta a 24', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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

    const resOperarios = await fetch(
      "http://localhost:8081/operario"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const data = {
      observacion: 'Observacion',
      idOti: '616f2980c5e1d1846975c8c',
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
    const asignarTarea = await resAsignarTarea.text();
    expect(resAsignarTarea.status).to.be.equal(400);

  });

  // tratando de asignar una tarea a un operario con un id de operario erroneo en el POST
  it.only('POST: atributo idOperario con longitud distinta a 24', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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

    const resOperarios = await fetch(
      "http://localhost:8081/operario"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const data = {
      observacion: 'Observacion',
      idOti: oti[1].idOti,
      idOperario: '613e6361b2153ee73d786bc',
      tareas: tareas
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

  // tratando de asignar una tarea a un operario con el atributo de tareas vacio en el POST
  it.only('POST: atributo tareas vacio', async () => {
    const resSectores = await fetch(
      "http://localhost:8081/sector"
    );
    const sectores = await resSectores.json();
    expect("Content-Type", /json/);
    expect(resSectores.status).to.be.equal(200);

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

    const resOperarios = await fetch(
      "http://localhost:8081/operario"
    );
    const operarios = await resOperarios.json();
    expect("Content-Type", /json/);
    expect(resOperarios.status).to.be.equal(200);

    const data = {
      observacion: 'Observacion',
      idOti: oti[1].idOti,
      idOperario: operarios[0]._id,
      tareas: []
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

});
