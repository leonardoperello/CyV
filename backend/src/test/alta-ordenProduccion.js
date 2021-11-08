let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);

const url = "http://localhost:8081";

describe("Obteniendo un cliente a traves de su cuit: ", () => {
  // it.only("Enviando un cuit de un cliente que existe", (done) => {
  //     chai
  //         .request(url)
  //         .get("/cliente/89-596-7321")
  //         .end(function (err, res) {
  //             // console.log(res.body);
  //             expect(res).to.have.status(200);
  //             done();
  //         });
  // });
  it("Enviando un cuit de un cliente que no existe", (done) => {
    chai
      .request(url)
      .get("/cliente/50-596-7320")
      .end(function (err, res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});
