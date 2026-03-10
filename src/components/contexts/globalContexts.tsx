import React, { ReactNode, useState } from 'react';

interface IGlobalContextProps {
  bgUrl: string;
  setBgUrl: (bg: string) => void
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  bgUrl: "",
  setBgUrl: () => { }
});

export const GlobalContextProvider = (props: any) => {
  const [bgUrl, setBgUrl] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        bgUrl,
        setBgUrl
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};