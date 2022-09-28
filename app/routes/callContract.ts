import { Router } from "express";

import { failedResponse, successResponse } from "../models/MyResponse";
import { changeMethod, viewMethod } from "../near";

const callContractRoute = Router();

callContractRoute.post("/", async function (req, res) {
  const type = req.body["type"];
  if (!type) {
    return res.status(400).json(failedResponse("Missing field `type`."));
  }

  const contract = req.body["from"];
  if (!contract) {
    return res.status(400).json(failedResponse("Missing field `from`."));
  }

  const method = req.body["method"];
  if (!method) {
    return res.status(400).json(failedResponse("Missing field `method`."));
  }

  try {
    if (type == "change") {
      let params = { method } as any;

      if (req.body["args"]) {
        params = { ...params, args: req.body["args"] };
      }

      if (req.body["gas"]) {
        params = { ...params, gas: req.body["gas"] };
      }

      if (req.body["deposit"]) {
        params = { ...params, deposit: req.body["deposit"] };
      }

      const response = await changeMethod(contract, params);

      return res.json(successResponse(response));
    }

    if (type == "view") {
      let params = { method } as any;

      if (req.body["args"]) {
        params = { ...params, args: req.body["args"] };
      }

      const response = await viewMethod(contract, params);

      return res.json(successResponse(response));
    }

    return res
      .status(400)
      .json(failedResponse("Field `type` must be 'change' or 'view'."));
  } catch (err: any) {
    res.status(500).json(failedResponse(err["message"]));
  }
});

export default callContractRoute;
