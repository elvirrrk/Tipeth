import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { App } from "./App";
import { config } from "./wagmi";

const qc = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    	<QueryClientProvider client={qc}>
      		<RainbowKitProvider>
				<App/>
			</RainbowKitProvider>
    	</QueryClientProvider>
  </WagmiProvider>,
);
