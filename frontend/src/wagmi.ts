import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Tipeth",
  projectId: "TIPETH_DEMO_PROJECT_ID",
  chains: [baseSepolia],
});