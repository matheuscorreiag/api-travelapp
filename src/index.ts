import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3332;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port);
