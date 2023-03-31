import { createContext, ReactNode, useContext, useState } from "react";

interface ISettingsContext {
  range: {
    min: number;
    max: number;
  };
  intervalTime: number;
  setIntervalTime: (interval: number) => void;
}

export const SettingsContext = createContext<ISettingsContext | null>(null);

interface Props {
  children: ReactNode;
}

export const useSettingsContext = () => {
  const settings = useContext(SettingsContext);

  if (!settings) {
    throw new Error(
      "useSettingsContext has to be used within <SettingsContext.Provider>"
    );
  }
  return settings;
};

const SettingsContextProvider = ({ children }: Props) => {
  const [intervalTime, setIntervalTime] = useState(2000);
  const [range] = useState({ min: 1, max: 90 });

  return (
    <SettingsContext.Provider value={{ range, intervalTime, setIntervalTime }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
