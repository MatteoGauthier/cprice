#!/usr/bin/env node

const fetch = require("node-fetch");

const arguments = process.argv.slice(2);
const quantityArg = arguments[0]; // Input
const currencyArg = arguments[1]; // Output

const urltest = arguments.length === 2 ? true : false;
const coinData = require("./list.json");

if (!urltest) {
	throw new Error("Not enough argument");
}

const convertSymbolToId = (currency) => {
	const symbol = currency.toLowerCase();
	const [{ id }] = coinData.filter((elem) => {
		return elem.symbol == symbol;
	})
	return id;
};

const getPrice = async ({ quantity = 1, currency = "btc" }) => {
	const coinId = convertSymbolToId(currency);
	const data = await (
		await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd%2Ceur%2Ceth%2Cbtc&include_24hr_change=true`
		)
	).json();
	console.log(data);
};

getPrice({ quantity: quantityArg, currency: currencyArg });
