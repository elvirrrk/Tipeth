import { useState } from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { 
	useWriteContract,
	useReadContract,
	useAccount,
	useWatchContractEvent
} from "wagmi";
import { parseEther } from 'viem'
import {TIPS_ABI, CONTRACT_ADDRESS} from "./abi/tips"

interface TipEvent {
	from: string;
	to: string;
	amount: bigint;
	txHash: string;
}

export function App() {
	const { address, isConnected } = useAccount();
	const [events, setEvents] = useState<TipEvent[]>([]);
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");

	const write = useWriteContract();
	const {data: totalReceived} = useReadContract({
    	abi: TIPS_ABI,
    	address: CONTRACT_ADDRESS,
    	functionName: "totalReceived",
    	args: recipient ? [recipient as `0x${string}`] : undefined,
		query: { enabled: !!recipient },
  });
  
  	useWatchContractEvent({
		abi: TIPS_ABI,
    	address: CONTRACT_ADDRESS,
		eventName: "Tipped",
		onLogs(logs) {
			logs.forEach((log) => {
				setEvents((prev) => [
					{
						from: log. args.from as string,
						to: log. args.to as string,
						amount: log.args.amount as bigint,
						txHash: log.transactionHash,
					},
					...prev
				])
			})
		}
  });
  if (!isConnected)
		return (
		<>
			<p>Send tips now</p>
			<ConnectButton/>
		</>
	);

	return (
		<main className='main-page'>
			<h1>Tipeth</h1>
			<ConnectButton />
			<div style={{ marginTop: 20 }}>
				<input
					value={recipient}
					onChange={e => setRecipient(e.target.value)}
					placeholder="0x... address"
				/>
				<input
					value={amount}
					onChange={e => setAmount(e.target.value)}
					placeholder="amount in ETH"
				/>
				<button
					onClick={() =>
						write.writeContract({
							abi: TIPS_ABI,
							address: CONTRACT_ADDRESS,
							functionName: "tip",
							args: [recipient as `0x${string}`],
							value: parseEther(amount || "0"),
						})
					}
					disabled={write.isPending}
				>
					{write.isPending ? "Sending…" : "Sending tips"}
				</button>
			</div>

			{write.data && <p>TX hash: <code>{write.data}</code></p>}
			{write.error && <p style={{ color: "red" }}>{write.error.message}</p>}
			{events.length > 0 &&
				<div>
					<h2>Last tips</h2>
					<ul>
						{events.map((elem, index) => 
							<li key={index}>
								{elem.from} to {elem.to}:
								{elem.amount.toString()}
								{elem.txHash.slice(0,10)}
								<a href="https://sepolia.basescan.org/tx/${elem.txHash}">Transaction link</a>
								{/* 0 - 10 or all? */}
							</li>
						)}
					</ul>
				</div>
			}
		</main>
	);
}

export default App
