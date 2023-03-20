import GameContextProvider from "@/contexts/game-context";
import SettingsContextProvider from "@/contexts/settings-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import config from "../../config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsContextProvider>
      <GameContextProvider>
        <Component {...pageProps} />
      </GameContextProvider>
    </SettingsContextProvider>
  );
}
