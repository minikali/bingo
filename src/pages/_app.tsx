import SettingsContextProvider from "@/contexts/settings-context";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsContextProvider>
      <Component {...pageProps} />
    </SettingsContextProvider>
  );
}
