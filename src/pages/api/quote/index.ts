import type { NextApiRequest, NextApiResponse } from "next";
import { FusionSDK, NetworkEnum } from "@1inch/fusion-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fromTokenAddress = req.query.fromTokenAddress;
  const toTokenAddress = req.query.toTokenAddress;
  const amount = req.query.amount;
  console.log(fromTokenAddress, toTokenAddress, amount);

  const sdk = new FusionSDK({
    url: "https://api.1inch.dev/fusion",
    network: NetworkEnum.ETHEREUM,
    authKey: process.env.NEXT_PUBLIC_1INCH_API_KEY,
  });

  try {
    const quote = await sdk.getQuote({
      fromTokenAddress: fromTokenAddress as string,
      toTokenAddress: toTokenAddress as string,
      amount: amount as string,
    });
    return res.status(200).json({
      quote: quote.toTokenAmount,
    });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ error: error.message });
  }
}
