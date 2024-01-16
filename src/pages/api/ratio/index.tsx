import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import axios from "axios";

type Data = {
  rate: any;
};

const provider = new ethers.EtherscanProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ETHERSCAN_KEY
);
const oneEtherStr = ethers.parseUnits("1", "ether").toString();

const ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const rETHAddress = "0xae78736Cd615f374D3085123A210448E74Fc6393";
const rETHContract = new ethers.Contract(
  rETHAddress,
  ["function getExchangeRate() view returns (uint256)"],
  provider
);

// const gasPrice = async () => {
//   return await axios.get('https://sentible.app/api/v1/gas-price')
//     .then(res => res.data)
// }

const secondaryRate = async (addr: string) => {
  return await axios
    .get(
      `http://localhost:3000/api/quote?fromTokenAddress=${addr}&toTokenAddress=${ethAddress}&amount=${oneEtherStr}`
    )
    .then((res) => res.data);
};

const getRatioRate = async () => {
  const BASE_RATIO = Number((await rETHContract.getExchangeRate()) || 0);
  const MARKET_RATIO = Number((await secondaryRate(rETHAddress))?.quote || 0);

  const PREMIUM = ((MARKET_RATIO - BASE_RATIO) / BASE_RATIO) * 100;

  return {
    base: BASE_RATIO / Number(oneEtherStr),
    market: MARKET_RATIO / Number(oneEtherStr),
    percent: PREMIUM,
    status: PREMIUM > 0 ? "premium" : "discount",
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rate = await getRatioRate();

  res.send({ rate });
}
