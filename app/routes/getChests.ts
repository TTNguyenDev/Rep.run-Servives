import { Router } from "express";
import Converter from "unity-rich-text-converter";

import { failedResponse, successResponse } from "../models/MyResponse";
import { viewMethod } from "../near";

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

    const richConverter = new Converter();

    const chests = [...adminChests, ...repChests];
    chests.forEach((ch) => {
      ch["message"] = richConverter.html2unity(ch["message"]);
    });

    res.json(successResponse(chests));
  } catch (err: any) {
    res.status(500).json(failedResponse(err["message"]));
  }
});

export default getChestsRoute;
