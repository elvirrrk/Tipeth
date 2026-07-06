import { useState } from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { 
	useWriteContract,
	useReadContract,
	useConnect, // useAccount
	useWatchContractEvent
} from "wagmi";
import {TIPS_ABI, CONTRACT_ADDRESS} from "./abi/tips"

export function App() {
	const { address, isConnected } = useConnect(); // useAccount
	const [events, setEvents] = useState<string[]>([]);

	const write = useWriteContract();
	useReadContract({
    	abi: TIPS_ABI,
    	address: CONTRACT_ADDRESS,
    	functionName: "tip",
    	args: address ? [address] : undefined,
		query: { enabled: isConnected },
  });
  	useWatchContractEvent({
		abi: TIPS_ABI,
    	address: CONTRACT_ADDRESS,
		eventName: "TipSent",
		onLogs(logs) {
			logs.forEach((log) => {
				console.log(log);
				setEvents((prev) => [
					`User: ${log.args.by} at ${new Date(Number(log.args.nonce) * 1000).toLocaleString()}`,
					...prev,
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
					value={nonce}
					onChange={e => setNonce(e.target.value)}
					placeholder="nonce"
				/>
				<button
					onClick={() =>
						write.writeContract({
							abi: TIPS_ABI,
							address: CONTRACT_ADDRESS,
							functionName: "tip"
							// args: ?
						})
					}
					disabled={write.isPending}
				>
					{write.isPending ? "Signing…" : "Check-in"}
				</button>
			</div>

			{write.data && <p>TX hash: <code>{write.data}</code></p>}
			{write.error && <p style={{ color: "red" }}>{write.error.message}</p>}
			{events.length > 0 &&
				<div>
					<h2>Events</h2>
					<ul>
						{events.map((elem, index) => <li key={index}>{elem}</li>)}
					</ul>
				</div>
			}
		</main>
	);
}

export default App
