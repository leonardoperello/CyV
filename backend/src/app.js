import express from "express";
import bodyParser from "body-parser";
export const app = express();
import tareaRoutes from "./routers/tarea";
import roscaRoutes from "./routers/rosca";
import otiRoutes from "./routers/oti";
import estadoRoutes from "./routers/estado";
import ordenRoutes from "./routers/orden";
import operarioRoutes from "./routers/operario";
import supervisorRoutes from "./routers/supervisor";
import altaOtiRoutes from "./routers/altaOti";
import altaTareaRoutes from "./routers/altaTarea";
import altaOrdenDeProduccionRoutes from "./routers/altaOrdenDeProduccion";
import altaAsignarTareasRoutes from "./routers/altaAsignarTareas";
import cambioDeEstadoRoutes from "./routers/cambioDeEstado";
import altaEstadoRoutes from "./routers/altaEstado";
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

app.use("/oti", otiRouter);
app.use("/rosca", roscaRoutes);
app.use("/tarea", tareaRoutes);
app.use("/estado", estadoRoutes);
app.use("/orden", ordenRoutes);
app.use("/operario", operarioRoutes);
app.use("/supervisor", supervisorRoutes);

/*
app.use("/altaOti", altaOtiRoutes);
app.use("/altaTarea", altaTareaRoutes);
app.use("/altaOrdenDeProduccion", altaOrdenDeProduccionRoutes);
app.use("/altaAsignarTareas", altaAsignarTareasRoutes);
app.use("/cambioDeEstado", cambioDeEstadoRoutes);
app.use("/altaEstado", altaEstadoRoutes);
*/
