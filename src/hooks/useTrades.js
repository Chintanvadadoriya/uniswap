// import {
//   ChainId,
//   Currency,
//   CurrencyAmount,
//   Pair,
//   Token,
//   Trade,
//   WETH,
// } from "polkabridge-sdk";
// import flatMap from "lodash.flatmap";
// import { useMemo } from "react";

// import { PairState, usePairs } from "./usePairs";
// import { ETH, NATIVE_TOKEN, SWAP_BASES } from "../constants/index";
// import { wrappedCurrency } from "./wrappedCurrency";
// import tokenListLocalRinkeby from "../tokenList/tokenListTest.json";
// import tokenListEthereum from "../tokenList/tokenListEthereum.json";
// import tokenListBsc from "../tokenList/tokenListBsc.json";
// import useActiveWeb3React from "../hooks/useActiveWeb3React";
// import { getAddress } from "@ethersproject/address";

// const localTokens: { [index: string]: Array<any> } = {
//   1: tokenListEthereum,
//   4: tokenListLocalRinkeby.ethereum,
//   97: tokenListLocalRinkeby.bsc,
//   56: tokenListBsc,
// };

// function getTokenWithSymbol(symbol: string, chainId: ChainId) {
//   const tokenItem = chainId
//     ? localTokens?.[chainId]?.find((_token: any) => _token.symbol === symbol)
//     : [];

//   if (NATIVE_TOKEN?.[chainId] === symbol) {
//     return WETH?.[chainId];
//   }

//   const _token = new Token(
//     chainId,
//     getAddress(tokenItem.address),
//     tokenItem.decimals,
//     tokenItem.symbol,
//     tokenItem.name
//   );
//   return _token;
// }

// export function useAllCommonPairs(
//   currencyA?: Currency,
//   currencyB?: Currency
// ): Pair[] {
//   const { chainId } = useActiveWeb3React();

//   const bases: Token[] = useMemo(
//     () =>
//       chainId
//         ? SWAP_BASES?.[chainId]?.map((symbol) => {
//             const tokenWithSymbol = getTokenWithSymbol(symbol, chainId);
//             return tokenWithSymbol;
//           })
//         : [],
//     [chainId]
//   );

//   const [tokenA, tokenB] = chainId
//     ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
//     : [undefined, undefined];

//   const basePairs: [Token, Token][] = useMemo(
//     () =>
//       flatMap(bases, (base): [Token, Token][] =>
//         bases?.map((otherBase) => [base, otherBase])
//       )?.filter(([t0, t1]) => t0.address !== t1.address),
//     [bases]
//   );

//   const allPairCombinations: [Token, Token ][] = useMemo(
//     () =>
//       tokenA && tokenB && bases
//         ? [
//             // the direct pair
//             [tokenA, tokenB],
//             // token A against all bases
//             ...bases?.map((base): [Token, Token] => [tokenA, base]),
//             // token B against all bases
//             ...bases?.map((base): [Token, Token] => [tokenB, base]),
//             // each base against all bases
//             ...basePairs,
//           ]
//             ?.filter((tokens): tokens is [Token, Token] =>
//               Boolean(tokens[0] && tokens[1])
//             )
//             ?.filter(([t0, t1]) => t0.address !== t1.address)
//             ?.filter(([tokenA, tokenB]) => {
//               if (!chainId) return true;
//               const customBases = undefined;
//               if (!customBases) return true;

//               const customBasesA: Token[] | undefined =
//                 customBases[tokenA.address];
//               const customBasesB: Token[] | undefined =
//                 customBases[tokenB.address];

//               if (!customBasesA && !customBasesB) return true;

//               if (
//                 customBasesA &&
//                 !(customBasesA as Token[]).find((base) => tokenB.equals(base))
//               )
//                 return false;
//               if (
//                 customBasesB &&
//                 !(customBasesB as Token[]).find((base) => tokenA.equals(base))
//               )
//                 return false;

//               return true;
//             })
//         : [],
//     [tokenA, tokenB, bases, basePairs, chainId]
//   );

//   // console.log("tradeTest trade", {
//   //   basePairs,
//   //   tokenA,
//   //   tokenB,
//   //   bases,
//   //   allPairCombinations,
//   // });
//   const allPairs = usePairs(allPairCombinations);

//   // only pass along valid pairs, non-duplicated pairs
//   return useMemo(
//     () =>
//       Object.values(
//         allPairs
//           // filter out invalid pairs
//           ?.filter((result): result is [PairState.EXISTS, Pair] =>
//             Boolean(result[0] === PairState.EXISTS && result[1])
//           )
//           // filter out duplicated pairs
//           ?.reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
//             memo[curr.liquidityToken.address] =
//               memo[curr.liquidityToken.address] ?? curr;
//             return memo;
//           }, {})
//       ),
//     [allPairs]
//   );
// }

// /**
//  * Returns the best trade for the exact amount of tokens in to the given token out
//  */
// export function useTradeExactIn(
//   currencyAmountIn?: CurrencyAmount,
//   currencyOut?: Currency
// ): Trade | null {
//   const allowedPairs = useAllCommonPairs(
//     currencyAmountIn?.currency,
//     currencyOut
//   );

//   // console.log("tradeTest  useTrade in", {
//   //   currencyA: currencyAmountIn?.currency,
//   //   currencyOut,
//   //   allowedPairs,
//   // });

//   return useMemo(() => {
//     if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
//       return (
//         Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, {
//           maxHops: 3,
//           maxNumResults: 1,
//         })[0] ?? null
//       );
//     }
//     return null;
//   }, [allowedPairs, currencyAmountIn, currencyOut]);
// }

// /**
//  * Returns the best trade for the token in to the exact amount of token out
//  */
// export function useTradeExactOut(
//   currencyIn?: Currency,
//   currencyAmountOut?: CurrencyAmount
// ): Trade | null {
//   const allowedPairs = useAllCommonPairs(
//     currencyIn,
//     currencyAmountOut?.currency
//   );

//   return useMemo(() => {
//     if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
//       return (
//         Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, {
//           maxHops: 3,
//           maxNumResults: 1,
//         })[0] ?? null
//       );
//     }
//     return null;
//   }, [allowedPairs, currencyIn, currencyAmountOut]);
// }
import { useEffect, useMemo } from "react";
import { PairState, usePairs } from "./usePairs";
import { Token, Trade, WETH } from "library";
import tokens from "../tokenList/tokenListTest.json";
import { NATIVE_TOKEN, SWAP_BASES } from "../constants";
import { getAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import { wrappedCurrency } from "./wrappedCurrency";
import flatMap from "lodash.flatmap";

function getTokenWithSymbol(symbol, chainId) {
	const tokenItem = chainId
		? tokens?.find((_token) => _token.symbol === symbol)
		: [];

	if (NATIVE_TOKEN?.[chainId] === symbol) {
		return WETH?.[chainId];
	}

	const _token = new Token(
		chainId,
		getAddress(tokenItem.address),
		tokenItem.decimals,
		tokenItem.symbol,
		tokenItem.name
	);
	return _token;
}

export function useAllCommonPairs(currencyA, currencyB) {
	const { chainId } = useWeb3React();

	const bases = useMemo(
		() =>
			chainId
				? SWAP_BASES?.[chainId]?.map((symbol) => {
						const tokenWithSymbol = getTokenWithSymbol(
							symbol,
							chainId
						);
						return tokenWithSymbol;
				  })
				: [],
		[chainId]
	);

	console.log("bases", bases);

	const [tokenA, tokenB] = chainId
		? [
				wrappedCurrency(currencyA, chainId),
				wrappedCurrency(currencyB, chainId),
		  ]
		: [undefined, undefined];

	const basePairs = useMemo(
		() =>
			flatMap(bases, (base) =>
				bases?.map((otherBase) => [base, otherBase])
			)?.filter(([t0, t1]) => t0.address !== t1.address),
		[bases]
	);
	console.log("basePairs", basePairs);
	const allPairCombinations = useMemo(
		() =>
			tokenA && tokenB && bases
				? [
						// the direct pair
						[tokenA, tokenB],
						// token A against all bases
						...bases?.map((base) => [tokenA, base]),
						// token B against all bases
						...bases?.map((base) => [tokenB, base]),
						// each base against all bases
						...basePairs,
				  ]
						?.filter((tokens) => Boolean(tokens[0] && tokens[1]))
						?.filter(([t0, t1]) => t0.address !== t1.address)
						?.filter(([tokenA, tokenB]) => {
							if (!chainId) return true;
							const customBases = undefined;
							if (!customBases) return true;

							const customBasesA = customBases[tokenA.address];
							const customBasesB = customBases[tokenB.address];

							if (!customBasesA && !customBasesB) return true;

							if (
								customBasesA &&
								customBasesA.find((base) => tokenB.equals(base))
							)
								return false;
							if (
								customBasesB &&
								customBasesB.find((base) => tokenA.equals(base))
							)
								return false;

							return true;
						})
				: [],
		[tokenA, tokenB, bases, basePairs, chainId]
	);

	// console.log("tradeTest trade", {
	//   basePairs,
	//   tokenA,
	//   tokenB,
	//   bases,
	//   allPairCombinations,
	// });
	console.log("allPairCombinations", allPairCombinations);
	const allPairs = usePairs(allPairCombinations) || [];
	// only pass along valid pairs, non-duplicated pairs
	return useMemo(() => {
		if (!allPairs?.length) return {};
		return Object.values(
			allPairs
				// filter out invalid pairs
				?.filter((result) =>
					Boolean(result[0] === PairState.EXISTS && result[1])
				)
				// filter out duplicated pairs
				?.reduce((memo, [, curr]) => {
					memo[curr.liquidityToken] =
						memo[curr.liquidityToken.address] ?? curr;
					return memo;
				}, {})
		);
	}, [allPairs]);
}

export function useTradeExactIn(currencyAmountIn, currencyOut) {
	const allowedPairs = useAllCommonPairs(
		currencyAmountIn?.currency,
		currencyOut
	);
	console.log("allowedPairsuseTradeExactIn", allowedPairs);
	return useMemo(() => {
		if (currencyAmountIn && currencyOut && allowedPairs?.length) {
			return (
				Trade.bestTradeExactIn(
					allowedPairs,
					currencyAmountIn,
					currencyOut,
					{
						maxHops: 3,
						maxNumResults: 1,
					}
				)[0] ?? null
			);
		}
		return null;
	}, [allowedPairs, currencyAmountIn, currencyOut]);
}

export function useTradeExactOut(currencyIn, currencyAmountOut) {
	const allowedPairs = useAllCommonPairs(
		currencyIn,
		currencyAmountOut?.currency
	);
	console.log("allowedPairsuseTradeExactOut", allowedPairs);
	return useMemo(() => {
		if (currencyIn && currencyAmountOut && allowedPairs?.length) {
			return (
				Trade.bestTradeExactOut(
					allowedPairs,
					currencyIn,
					currencyAmountOut,
					{
						maxHops: 3,
						maxNumResults: 1,
					}
				)[0] ?? null
			);
		}
		return null;
	}, [allowedPairs, currencyIn, currencyAmountOut]);
}
