import express from "express";
import bodyParser from "body-parser";
import altaEstadoRoutes from "./routers/altaEstado";
import otiRoutes from "./routers/oti";
import rosca from "./routers/rosca";
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

app.use("/oti", otiRoutes);
app.use("/altaEstado", altaEstadoRoutes);
app.use("/rosca", rosca);
// app.use("/altaTarea", altaTareaRoutes);
// app.use("/altaOrdenDeProduccion", altaOrdenDeProduccionRoutes);
// app.use("/altaAsignarTareas", altaAsignarTareasRoutes);
// app.use("/cambioDeEstado", cambioDeEstadoRoutes);
