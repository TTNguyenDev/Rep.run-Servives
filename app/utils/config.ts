import * as dotenv from "dotenv";

dotenv.config();

const port = process.env["PORT"]!;
const nearPrivateKey = process.env["NEAR_PRIVATE_KEY"]!;
const nearAccountId = process.env["NEAR_ACCOUNT_ID"]!;
const repContractId = process.env["REP_CONTRACT_ID"]!;
const adminContractId = process.env["ADMIN_CONTRACT_ID"]!;

export { port, nearPrivateKey, nearAccountId, repContractId, adminContractId };
