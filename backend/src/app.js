import express from "express";
import bodyParser from "body-parser";
import estadoRoutes from "./routers/estado";
import altaOtiRoutes from "./routers/oti";
import rosca from "./routers/rosca";
import tareaRoutes from "./routers/tarea";

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

app.use("/altaOti", altaOtiRoutes);
app.use("/estado", estadoRoutes);
app.use("/rosca", rosca);
app.use("/tarea", tareaRoutes);
