import JSBI from "jsbi";

import { SolidityType } from "../constants";
import { validateSolidityTypeInstance } from "../utils";

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
	decimals;
	symbol;
	name;

	/**
	 * The only instance of the base class `Currency`.
	 */
	static ETHER = new Currency(18, "ETH", "Ether"); //Todo: set default currency here depeding on current chain ID

	/**
	 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
	 * @param decimals decimals of the currency
	 * @param symbol symbol of the currency
	 * @param name of the currency
	 */
	constructor(decimals, symbol, name) {
		validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);

		this.decimals = decimals;
		this.symbol = symbol;
		this.name = name;
	}
}

const ETHER = Currency.ETHER;
export { ETHER };
