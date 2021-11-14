let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("Testeando los casos correctos: ", () => {
  it("Enviando un cuit de un cliente que existe", (done) => {
    chai
      .request(url)
      .get("/cliente/20332288354")
      .end(function (err, res) {
        // console.log(res.error.text);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Creando una nueva rosca ", (done) => {
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
        },
      },
    };
    chai
      .request(url)
      .post("/rosca/")
      .send({ rosca })
      .end(function (err, res) {
        // console.log(res.text);
        expect(res).to.have.status(200);
        done();
      });
  });

  it.only("Creando una nueva orden de produccion ", (done) => {
    const ordenProduccion = {
      cuitCliente: "20332288354",
      detalle: "detalle de orden de produccion",
      fecha: "2021-11-09",
      supervisor: {
        _id: "613bc8c397d979667ca2a137",
        numeroEmpleado: "2",
        DNI: "96-881-7733",
        nombre: "Corey",
        apellido: "Duling",
        telefono: "850-421-9067",
        nombreUsuario: "cduling1",
        contraseña: "KgFLuaKY0ySG",
        email: "cduling1@github.io",
      },
      oti: [],
      rosca: [
        {
          _id: "613e5383b2153ee73d71591a",
          descripcionTecnica: "una rosca que la puede hacer cualquiera",
          medida: "30x30x30",
          tipoDeRosca: {
            nombre: "8RD",
            descripcion: "descripcion_1",
            categoria: {
              nombre: "tubing",
              descripcion: "extraccion de petroleo",
            },
          },
        },
      ],
    };
    chai
      .request(url)
      .post("/orden/crearOrdenProduccion")
      .send(ordenProduccion)
      .end(function (err, res) {
        console.log(res.error.text);
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ---------------------------- TEST QUE DEBEN FALLAR -----------------------------

describe("Testeando los casos incorrectos : ", () => {
  it("Enviando un cuit de un cliente que no existe", (done) => {
    chai
      .request(url)
      .get("/cliente/2033228835") // fallaria xq el cuit esta mal, le falta un caracter
      .end(function (err, res) {
        console.log(res.error.text);
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Creando una nueva rosca con parametros erroneos ", (done) => {
    let rosca = {
      id: "616e3f364ce714735d5f67a7",
      descripcionTecnica: "es una rosca dificil de hacer",
      medida: "20x50x10",
      tipoDeRosca: {}, // fallaria xq el tipo de rosca esta vacio
    };
    chai
      .request(url)
      .post("/rosca/")
      .send({ rosca })
      .end(function (err, res) {
        console.log(res.error.text);
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Creando una nueva orden de produccion con parametros incorrectos", (done) => {
    const ordenProduccion = {
      cuitCliente: "20332288354",
      detalle: "detalle de orden de produccion",
      fecha: "2021-11-10", // La fecha no corresponde con la de hoy!
      supervisor: {
        _id: "613bc8c397d979667ca2a137",
        numeroEmpleado: "2",
        DNI: "96-881-7733",
        nombre: "Corey",
        apellido: "Duling",
        telefono: "850-421-9067",
        nombreUsuario: "cduling1",
        contraseña: "KgFLuaKY0ySG",
        email: "cduling1@github.io",
      },
      oti: [],
      rosca: [
        {
          _id: "613e5383b2153ee73d71591a",
          descripcionTecnica: "una rosca que la puede hacer cualquiera",
          medida: "30x30x30",
          tipoDeRosca: {
            nombre: "8RD",
            descripcion: "descripcion_1",
            categoria: {
              nombre: "tubing",
              descripcion: "extraccion de petroleo",
            },
          },
        },
      ],
    };
    chai
      .request(url)
      .post("/orden/crearOrdenProduccion")
      .send(ordenProduccion)
      .end(function (err, res) {
        console.log(res.error.text);
        expect(res).to.have.status(400);
        done();
      });
  });
});
