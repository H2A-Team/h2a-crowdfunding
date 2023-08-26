import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/index.scss";
import ScrollTopButton from "./components/buttons/scroll-top";
import { routes } from "./constants/routes";
import { customizedTheme } from "./constants/theme";
import { BlockUIProvider } from "./contexts/block-ui";
import { SmartContractProvider } from "./contexts/smart-contract";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <StyleProvider hashPriority="high">
            <ConfigProvider theme={customizedTheme}>
                <BlockUIProvider>
                    <SmartContractProvider>
                        <RouterProvider router={router} />
                        <ScrollTopButton />
                    </SmartContractProvider>
                </BlockUIProvider>
            </ConfigProvider>
        </StyleProvider>
    </React.StrictMode>
);
