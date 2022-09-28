import { adminContractId, repContractId } from "../utils/config";
import MyContract from "./contract";

const adminContract = new MyContract();
const repContract = new MyContract();

const init = function () {
  adminContract.initContract({
    contractId: adminContractId,
    viewMethods: ["get_active_chests_by_key"],
  });

  repContract.initContract({
    contractId: repContractId,
    changeMethods: ["mint_chest"],
    viewMethods: ["get_active_chests_by_key"],
  });
};

const changeMethod = async function (
  contract: string,
  params: {
    method: string;
    args?: any;
    gas?: string;
    deposit?: string;
  }
) {
  if (contract == "admin") {
    return await adminContract.changeMethod(params);
  }

  if (contract == "rep") {
    return await repContract.changeMethod(params);
  }

  throw new Error(`Contract ${contract} does not exist.`);
};

const viewMethod = async function (
  contract: string,
  params: { method: string; args?: any }
) {
  if (contract == "admin") {
    return await adminContract.viewMethod(params);
  }

  if (contract == "rep") {
    return await repContract.viewMethod(params);
  }

  throw new Error(`Contract ${contract} does not exist.`);
};

export { init as initNear, changeMethod, viewMethod };
