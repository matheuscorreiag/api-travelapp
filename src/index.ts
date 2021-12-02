require("dotenv").config();

import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(port);
