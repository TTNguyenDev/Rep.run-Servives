import { json } from "body-parser";
import express from "express";

import { initNear } from "./near";
import { callContractRoute, getChestsRoute } from "./routes";
import { port } from "./utils/config";

const app = express();

app.use(json());

app.use("/call-contract", callContractRoute);
app.use("/get-chests", getChestsRoute);

initNear();

app.listen(port, () => {
  console.log(`[rep-ar] server up: ${port}`);
});
