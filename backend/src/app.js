import express from "express";
import bodyParser from "body-parser";
export const app = express();
import tareaRoutes from "./controllers/tarea";
import roscaRoutes from "./controllers/rosca";
import otiRoutes from "./controllers/oti";

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
app.use("/rosca", roscaRoutes);
app.use("/tarea", tareaRoutes);
