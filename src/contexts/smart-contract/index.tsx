import { useAddress, useContract } from "@thirdweb-dev/react";
import { ReactNode, createContext, useContext } from "react";
import { APP_CONFIGS } from "../../configs";

interface ISmartContract {
    address: string | undefined;
    contract: any;
}

const SmartContract = createContext<ISmartContract>({ address: "", contract: null });

export const SmartContractProvider = ({ children }: { children: ReactNode }) => {
    const { contract }: { contract: any } = useContract(APP_CONFIGS.contractAddress);

    const address = useAddress();

    return <SmartContract.Provider value={{ address, contract }}>{children}</SmartContract.Provider>;
};

export const useSmartContract = () => {
    const smartContractContext = useContext(SmartContract);

    if (smartContractContext === undefined) {
        throw new Error("useSmartContract must be used within a SmartContractProvider");
    }

    return smartContractContext;
};
