import { Account, connect, Contract, KeyPair, keyStores } from "near-api-js";

import { nearAccountId, nearPrivateKey } from "../utils/config";

class MyContract {
  contract: Contract | undefined;
  account: Account | undefined;

  async viewMethod(params: { method: string; args?: any }) {
    return await this.account?.viewFunction({
      contractId: this.contract?.contractId,
      methodName: params.method,
      args: params.args || {},
    });
  }

  async changeMethod(params: {
    method: string;
    args?: any;
    gas?: string;
    deposit?: string;
  }) {
    const contractAsAny = this.contract! as any;

    return await contractAsAny[params.method]({
      args: params.args || {},
      gas: params.gas || "300000000000000",
      amount: params.deposit || "0",
    });
  }

  async initContract(params: {
    contractId: string;
    changeMethods?: string[];
    viewMethods?: string[];
  }) {
    const keyPair = KeyPair.fromString(nearPrivateKey);

    const keyStore = new keyStores.InMemoryKeyStore();
    keyStore.setKey("testnet", nearAccountId, keyPair);

    const nearConn = await connect({
      networkId: "testnet",
      keyStore: keyStore,
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      headers: {},
    });

    this.account = await nearConn.account(nearAccountId);

    this.contract = new Contract(this.account, params.contractId, {
      changeMethods: params.changeMethods || [],
      viewMethods: params.viewMethods || [],
    });

    console.log("[rep-ar] contract:", this.contract);
  }
}

export default MyContract;
