import { theme } from "antd";
import "./index.scss";

const { useToken } = theme;

export default function AppFooter() {
    const { token } = useToken();

    return (
        <footer
            className="single-column-layout__app-footer"
            style={{ backgroundColor: token.colorPrimary, color: token.colorWhite }}
        >
            <span>H2A Crowdfunding by H2A Team</span>
        </footer>
    );
}
