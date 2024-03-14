import { SigningCosmWasmClient } from "cosmwasm";
// import { Cw20Coin, InstantiateMsg } from "../../bindings/Cw20.types";
import { InstantiateMsg } from "../../bindings/OraiGateway.types";

export async function initToken(
  client: SigningCosmWasmClient,
  address: string,
  code: number
) {
  // const initial_balances: Cw20Coin[] = [{ address, amount: "123456000000" }];
  // const initMsg: InstantiateMsg = {
  //   name: "Test Token",
  //   symbol: "TTOKEN",
  //   decimals: 6,
  //   initial_balances,
  //   mint: {
  //     minter: address,
  //   },
  // };

  const initMsg: InstantiateMsg = {
    admin: address,
    ibc_bridge_wasm: "orai195269awwnt5m6c843q6w7hp8rt0k7syfu9de4h0wz384slshuzps8y7ccm"
  };

  const info = await client.instantiate(
    address,
    code,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initMsg,
    "Test Token 1.0",
    "auto",
    // {
    //   admin: address,
    // }
  );
  return info.contractAddress;
}
