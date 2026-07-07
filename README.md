# Tipeth
Send ETH tips straight to anyone's wallet.
<!-- screenshot -->
## How it works

Connect your wallet, type in a creator's address and how much ETH you want to send, hit Tip. That's it — the ETH goes straight to them, and the contract quietly keeps score.

## Features

- Tip any address directly
- Tracks total received per creator
- On-chain leaderboard
- Emits an event for every tip

## Contract Details

### State Variables

`totalReceived` -> `mapping(address => uint256)` -  how much ETH each address has received
`creators` -> `address[]` - everyone who's ever been tipped
`isCreator` -> `mapping(address => bool)` - avoids duplicate entries

### Functions

```solidity
	tip(address creator) external payable
```
Sends ETH to creator. Reverts on zero value or zero address. Updates their total, forwards the funds, emits Tipped.

```solidity
	topTipped(uint8 n) external view returns (address[] memory)
```
Top n creators by total received, highest first.

### Events

```solidity
event Tipped(address indexed from, address indexed to, uint256 amount);
```

## Frontend

- An address input field (creator's address) and an amount input field (ETH to tip)
- A "Tip" button to trigger the transaction

## How to run locally

```bash
	git clone <repo-url>
	cd tipeth
	npm install

	npm run dev #run the frontend
```

## Skills Practiced

msg.value & payable functions, mappings & dynamic arrays, indexed events, on-chain sorting (bubble sort)

## License

MIT
