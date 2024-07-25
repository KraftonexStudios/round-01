import { createContext, useRef } from "react";

export const refContext = createContext({
  HeroRef: null,
  OverLayStaticRef: null,
  Choice1Ref: null,
  Choice2Ref: null,
  Choice3Ref: null,
});

export const RefContextWrapper = ({ children }) => {
  const HeroRef = useRef(null);
  const OverLayStaticRef = useRef(null);
  const Choice1Ref = useRef(null);
  const Choice2Ref = useRef(null);
  const Choice3Ref = useRef(null);
  return (
    <refContext.Provider
      value={{
        HeroRef,
        OverLayStaticRef,
        Choice1Ref,
        Choice2Ref,
        Choice3Ref,
      }}
    >
      {children}
    </refContext.Provider>
  );
};
