"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

type ContextTypes = {
  setUserProfile: Dispatch<any>;
  userProfile: UserProfile;
};
const Context = createContext({} as ContextTypes);
export const useContextProvider = () => useContext(Context);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<any>();
  return (
    <Context.Provider value={{ setUserProfile, userProfile }}>
      {children}
    </Context.Provider>
  );
};
