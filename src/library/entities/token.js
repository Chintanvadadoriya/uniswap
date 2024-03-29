import invariant from "tiny-invariant";
import { ChainId } from "../constants";
import { validateAndParseAddress } from "../utils";
import { Currency } from "./currency";

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
	chainId;
	address;

	constructor(chainId, address, decimals, symbol, name) {
		super(decimals, symbol, name);
		this.chainId = chainId;
		this.address = validateAndParseAddress(address);
	}

	/**
	 * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
	 * @param other other token to compare
	 */
	equals(other) {
		// short circuit on reference equality
		if (this === other) {
			return true;
		}
		return this.chainId === other.chainId && this.address === other.address;
	}

	/**
	 * Returns true if the address of this token sorts before the address of the other token
	 * @param other other token to compare
	 * @throws if the tokens have the same address
	 * @throws if the tokens are on different chains
	 */
	sortsBefore(other) {
		invariant(this.chainId === other.chainId, "CHAIN_IDS");
		invariant(this.address !== other.address, "ADDRESSES");
		return this.address.toLowerCase() < other.address.toLowerCase();
	}
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA, currencyB) {
	if (currencyA instanceof Token && currencyB instanceof Token) {
		return currencyA.equals(currencyB);
	} else if (currencyA instanceof Token) {
		return false;
	} else if (currencyB instanceof Token) {
		return false;
	} else {
		return currencyA === currencyB;
	}
}

export const WETH = {
	[ChainId.ETHEREUM]: new Token(
		ChainId.ETHEREUM,
		"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[ChainId.RINKEBY]: new Token(
		ChainId.RINKEBY,
		"0xc778417e063141139fce010982780140aa0cd5ab",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[ChainId.MATIC]: new Token(
		ChainId.MATIC,
		"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		18,
		"WETH",
		"Wrapped Ether"
	),
	[ChainId.MUMBAI]: new Token(
		ChainId.MUMBAI,
		"0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
		18,
		"WMATIC",
		"Wrapped Matic"
	),
};
