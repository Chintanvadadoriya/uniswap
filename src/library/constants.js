import JSBI from "jsbi";

export const INIT_CODE_HASH =
	"bfd13fee87dbe1422f0d41b35942b6d79c4a761c64a1e788b04e7341499063d2"; // it's me

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

// exports for internal consumption
export const ZERO = JSBI.BigInt(0);
export const ONE = JSBI.BigInt(1);
export const TWO = JSBI.BigInt(2);
export const THREE = JSBI.BigInt(3);
export const FIVE = JSBI.BigInt(5);
export const TEN = JSBI.BigInt(10);
export const _100 = JSBI.BigInt(100);
export const _997 = JSBI.BigInt(997);
export const _1000 = JSBI.BigInt(1000);

export const ChainId = {
	MUMBAI: 80001,
	MATIC: 137,
	ETHEREUM: 1,
	RINKEBY: 4,
};

// exports for external consumption

export const Rounding = {
	ROUND_DOWN: "ROUND_DOWN",
	ROUND_HALF_UP: "ROUND_HALF_UP",
	ROUND_UP: "ROUND_UP",
};

export const TradeType = {
	EXACT_INPUT: "EXACT_INPUT",
	EXACT_OUTPUT: "EXACT_OUTPUT",
};

export const SolidityType = {
	uint8: "uint8",
	uint256: "uint256",
};

export const SOLIDITY_TYPE_MAXIMA = {
	[SolidityType.uint8]: JSBI.BigInt("0xff"),
	[SolidityType.uint256]: JSBI.BigInt(
		"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
	),
};
