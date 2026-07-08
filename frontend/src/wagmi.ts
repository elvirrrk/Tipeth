import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Tipeth",
  projectId: "8bc63d141cee264522ed7421cf485ef7",
  chains: [baseSepolia],
});