import express from "express";
import bodyParser from "body-parser";
import altaEstadoRoutes from "./routers/altaEstado";
export const app = express();
app.use(bodyParser.json());
//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// app.use("/altaOti", altaOtiRoutes);
// app.use("/altaTarea", altaTareaRoutes);
// app.use("/altaOrdenDeProduccion", altaOrdenDeProduccionRoutes);
// app.use("/altaAsignarTareas", altaAsignarTareasRoutes);
// app.use("/cambioDeEstado", cambioDeEstadoRoutes);
app.use("/altaEstado", altaEstadoRoutes);

