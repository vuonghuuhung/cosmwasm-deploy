import { Contract, getMnemonic } from "./helpers/utils";
import { connect } from "./helpers/connect";
import { OraichainConfig, malagaConfig } from "./networks";
import { hitFaucet } from "./helpers/hitFaucet";
import { uploadContracts } from "./helpers/uploadContracts";
import { initToken } from "./helpers/initToken";

const contracts: Contract[] = [
  {
    name: "orai_gateway",
    wasmFile: "./contracts/orai_gateway.wasm",
  },
];

async function main(): Promise<void> {
  /**
   *  We're going to upload & initialise the contract here!
   *  Check out the video course on academy.cosmwasm.com!
   */

  // get menemonic
  const mnemonic = getMnemonic();

  // signing client
  const { client, address } = await connect(mnemonic, OraichainConfig);

  // check balance
  const amount = await client.getBalance(address, OraichainConfig.feeToken);

  if (amount.amount === "0") {
    console.log("Address has no tokens");
    throw new Error("Address has no tokens");
  }
  console.log(`Address has ${amount.amount} ${OraichainConfig.feeToken}`);
  // upload the contract
  const codeId = await uploadContracts(client, address, contracts);

  // // ínstantiate the contract 
  const contractAddress = await initToken(client, address, codeId.orai_gateway);

  console.log(`Contract address: ${contractAddress}`);
}

main().then(
  () => {
    process.exit(0);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
