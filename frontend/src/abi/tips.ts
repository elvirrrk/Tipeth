export const TIPS_ABI = [
	{
		type: "function",
		name: "tip",
		stateMutability: "payable",
		inputs: [{ name: "creator", type: "address", internalType: "address" }],
		outputs: [],
	},
	{
		type: "function",
		name: "topTipped",
		stateMutability: "view",
		inputs: [{ name: "n", type: "uint8", internalType: "uint8" }],
		outputs: [{ name:"", type:"address[]", internalType:"address[]" }],
	},
	{
		type: "function",
		name: "totalReceived",
		stateMutability: "view",
		inputs: [{ name: "", type: "address", internalType: "address" }],
		outputs: [{ name:"", type:"uint256", internalType:"uint256" }],
	},
	{
		type: "event",
		name: "TipSent",
		anonymous: false,
		inputs: [
			{ name: "from", type: "address", indexed: true, internalType:"address" },
			{ name: "to", type: "address", indexed: true, internalType:"address" },
			{ name: "amount", type: "uint256", indexed: false, internalType:"uint256" },
			{ name: "message", type: "string", indexed: false, internalType:"string" },
		],
	},
	{
		type: "event",
		name: "Tipped",
		anonymous: false,
		inputs: [
			{ name: "from", type: "address", indexed: true, internalType:"address" },
			{ name: "to", type: "address", indexed: true, internalType:"address" },
			{ name: "amount", type: "uint256", indexed: false, internalType:"uint256" },
		],
	},
] as const;
// src/Tips.sol\":{\"keccak256\":0x9885e5f1e3ed8faa9fcf5d9a516759813c20eebf75f81565f535ea0050faec42

export const CONTRACT_ADDRESS = "0x9885e5f1e3ed8faa9fcf5d9a516759813c20eebf75f81565f535ea0050faec42" as `0x${string}`;
