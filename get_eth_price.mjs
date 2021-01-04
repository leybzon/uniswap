import { ChainId, Token, WETH, Fetcher, Route, Trade, TradeType, TokenAmount } from '@uniswap/sdk';
import { utils } from "ethers";

const chainId = ChainId.MAINNET;

//from https://etherscan.io/tokens?sortcmd=remove&sort=marketcap&order=desc

//const bnb = new Token(chainId, "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", 18)
//const link = new Token(chainId, "0x514910771af9ca656af840dff83e8264ecf986ca", 18)
//const tether = new Token(chainId, "0xdac17f958d2ee523a2206206994597c13d831ec7", 6)
const usdc = new Token(chainId, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 6)

//const dai = await Fetcher.fetchTokenData(chainId, "0x6B175474E89094C44Da98b954EedeAC495271d0F")


var tokens = [usdc]
const weth = WETH[chainId];

for (var token of tokens) {
  const pair = await Fetcher.fetchPairData(token, weth);
  const route = new Route([pair], WETH[chainId])

  // swap 1 ether
  const trade = new Trade(route, new TokenAmount(weth, utils.parseEther("1.0")), TradeType.EXACT_INPUT);
  console.log("execution price: $" + trade.executionPrice.toSignificant(6));
  console.log("price impact: " + trade.priceImpact.toSignificant(6) + "%");

}
