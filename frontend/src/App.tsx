import { useState } from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import "./App.css"
import {
	useWriteContract,
	useReadContract,
	useAccount,
	useWatchContractEvent
} from "wagmi";
import { parseEther } from 'viem'
import { TIPS_ABI, CONTRACT_ADDRESS } from "./abi/tips"

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
	const { data: totalReceived } = useReadContract({
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
						from: log.args.from as string,
						to: log.args.to as string,
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
				<Header />
				<main className='main-page'>
					<p>Send tips now</p>
					<ConnectButton/>	
				</main>
				
				<Footer />
			</>
		);

	return (
		<>
			<Header />
			<main className='main-page'>
				<h1 className='main-page__header'>Tipeth</h1>
				<ConnectButton />
				{address && <p className='main-page__connected-address'>Connected as: {address}</p>}
				<div>
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
						className='main-page__button-transaction'
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
						{write.isPending ? "Sending…" : "Send tips"}
					</button>
				</div>
				{recipient && totalReceived !== undefined && (
					<p>This address recieved {totalReceived}</p>
				)}
				{write.data && <p>TX hash: <code>{write.data}</code></p>}
				{write.error && <p className='warn-red'>{write.error.message}</p>}
				{events.length > 0 &&
					<div className='tips'>
						<h2 className='tips__header'>Recent tips</h2>
						<ul className='tips__tips-list tips-list'>
							{events.map((elem, index) =>
								<li className='tips-list__tip tip' key={index}>
									<div className='tip__row from-to'>From: {elem.from} to {elem.to}:</div>
									<div className='tip__row amount'>Amount: {elem.amount.toString()}</div>
									<div className='tip__row hash'>Short Tx hash: {elem.txHash.slice(0, 10)}</div>
									<div className='tip__row link'>
										<span className='link__header-text'>View on explorer</span>
										<a className='link__text' href={`https://sepolia.basescan.org/tx/${elem.txHash}`} target="_blank" rel='noreferrer'>Transaction link</a>
									</div>
								</li>
							)}
						</ul>
					</div>
				}
			</main>
			<Footer />
		</>
	);
}

export default App
