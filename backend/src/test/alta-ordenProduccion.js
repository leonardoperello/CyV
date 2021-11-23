let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
const fetch = require("node-fetch-npm");
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("Test de orden de produccion ", () => {
  
  it("GET: cuit de cliente inexistente", async () =>{
    const resCliente = await fetch(
      "http://localhost:8081/cliente/2035462783"
    );
    const cliente = await resCliente.text();
    expect("Content-Type", /json/);
    expect(resCliente.status).to.be.equal(400);
  })

  it("POST: creando rosca con parametros incorrectos", async () =>{
    const resCliente = await fetch(
      "http://localhost:8081/cliente/89-596-7321"
    );
    const cliente = await resCliente.json();
    expect("Content-Type", /json/);
    expect(resCliente.status).to.be.equal(200);

    const resSupervisor = await fetch(
      "http://localhost:8081/supervisor"
    );
    const supervisor = await resSupervisor.json();
    expect("Content-Type", /json/);
    expect(resSupervisor.status).to.be.equal(200);

    const resTipoRosca = await fetch(
      "http://localhost:8081/rosca/tipoDeRosca"
    );
    const tipoRosca = await resTipoRosca.json();
    expect("Content-Type", /json/);
    expect(resTipoRosca.status).to.be.equal(200);

    const data = {
      descripcionTecnica: 123,
      medida: 30,
      tipoDeRosca: '8RD'
    };

    const resCrearRosca = await fetch("http://localhost:8081/rosca/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const roscaCreada = await resCrearRosca.text();
    expect("Content-Type", /json/);
    expect(resCrearRosca.status).to.be.equal(400);
  })

  it("POST: crear orden de produccion con parametros incorrectos", async () => {
    const resCliente = await fetch(
      "http://localhost:8081/cliente/89-596-7321"
    );
    const cliente = await resCliente.json();
    expect("Content-Type", /json/);
    expect(resCliente.status).to.be.equal(200);

    const resSupervisor = await fetch(
      "http://localhost:8081/supervisor"
    );
    const supervisor = await resSupervisor.json();
    expect("Content-Type", /json/);
    expect(resSupervisor.status).to.be.equal(200);

    const resTipoRosca = await fetch(
      "http://localhost:8081/rosca/tipoDeRosca"
    );
    const tipoRosca = await resTipoRosca.json();
    expect("Content-Type", /json/);
    expect(resTipoRosca.status).to.be.equal(200);

    const data = {
      descripcionTecnica: 'descripcion',
      medida: '30x30x30',
      tipoDeRosca: tipoRosca[0]
    };

    const resCrearRosca = await fetch("http://localhost:8081/rosca/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const roscaCreada = await resCrearRosca.json();
    expect("Content-Type", /json/);
    expect(resCrearRosca.status).to.be.equal(200);

    const data2 = {
      cuitCliente: 12345657,
      detalle: 123,
      fecha: "22-11-2021",
      supervisor: null,
      oti: [],
      rosca: {}
    };

    const resCrearOrden = await fetch("http://localhost:8081/orden/crearOrdenProduccion", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const crearOrden = await resCrearOrden.text();
    expect("Content-Type", /json/);
    expect(resCrearOrden.status).to.be.equal(400);
  });

  it("POST: Crear orden de produccion existosa", async () => {
    const resCliente = await fetch(
      "http://localhost:8081/cliente/89-596-7321"
    );
    const cliente = await resCliente.json();
    expect("Content-Type", /json/);
    expect(resCliente.status).to.be.equal(200);

    const resSupervisor = await fetch(
      "http://localhost:8081/supervisor"
    );
    const supervisor = await resSupervisor.json();
    expect("Content-Type", /json/);
    expect(resSupervisor.status).to.be.equal(200);

    const resTipoRosca = await fetch(
      "http://localhost:8081/rosca/tipoDeRosca"
    );
    const tipoRosca = await resTipoRosca.json();
    expect("Content-Type", /json/);
    expect(resTipoRosca.status).to.be.equal(200);

    const data = {
      descripcionTecnica: 'descripcion',
      medida: '30x30x30',
      tipoDeRosca: tipoRosca[0]
    };

    const resCrearRosca = await fetch("http://localhost:8081/rosca/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const roscaCreada = await resCrearRosca.json();
    expect("Content-Type", /json/);
    expect(resCrearRosca.status).to.be.equal(200);

    const data2 = {
      cuitCliente: cliente.CUIT,
      detalle: 'detalle',
      fecha: "2021-11-22", // cambiar la fecha
      supervisor: supervisor[0],
      oti: [],
      rosca: roscaCreada
    };

    const resCrearOrden = await fetch("http://localhost:8081/orden/crearOrdenProduccion", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const crearOrden = await resCrearOrden.json();
    expect("Content-Type", /json/);
    expect(resCrearOrden.status).to.be.equal(200);
  });
});