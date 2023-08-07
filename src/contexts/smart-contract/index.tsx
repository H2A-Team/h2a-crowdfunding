import { createContext, useContext } from "react";

interface ISmartContract {}

const SmartContract = createContext<ISmartContract>({});

export const SmartContractProvider = ({ children }: { children: JSX.Element }) => {
    return <SmartContract.Provider value={{}}>{children}</SmartContract.Provider>;
};

export const useSmartContract = () => {
    const smartContractContext = useContext(SmartContract);

    if (smartContractContext === undefined) {
        throw new Error("useSmartContract must be used within a SmartContractProvider");
    }

    return smartContractContext;
};
