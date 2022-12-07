import { Router } from "express";

import { failedResponse, successResponse } from "../models/MyResponse";
import { viewMethod } from "../near";
import { repContractId } from "../utils/config";

const getChestsRoute = Router();

getChestsRoute.post("/all-active", async function (req, res) {
  const key = req.body["key"];
  if (!key) {
    return res.status(400).json(failedResponse("Missing field `key`."));
  }

  try {
    const params = {
      method: "get_active_chests_by_key",
      args: { key },
    };

    const [adminRes, repRes] = await Promise.all([
      viewMethod("admin", params),
      viewMethod("rep", params),
    ]);

    const adminChests = (adminRes as any[]).map((chest) => ({
      ...chest,
      contract: "admin",
    }));

    const repChests = (repRes as any[]).map((chest) => ({
      ...chest,
      contract: "rep",
    }));

    res.json(
      successResponse({
        chests: [...adminChests, ...repChests],
        contractId: repContractId,
      })
    );
  } catch (err: any) {
    res.status(500).json(failedResponse(err["message"]));
  }
});

export default getChestsRoute;
