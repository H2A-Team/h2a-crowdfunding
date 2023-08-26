import {
    Avatar,
    Breadcrumb,
    Card,
    Carousel,
    Col,
    Progress,
    Row,
    Space,
    Tabs,
    TabsProps,
    Tooltip,
    Typography,
    theme,
} from "antd";
import { Link, useParams } from "react-router-dom";
import EthSvg from "../../components/svg-components/eth-svg";
import { inferStatusBannerVariant, prepareVariantStyle } from "../../utils/project-card";
import CoverItem from "./components/cover-item";
import "./styles.scss";
import { ProjectDescription } from "./components/project-description";
import ProjectTokenInformation from "./components/project-token-information";
import ProjectSchedule from "./components/project-schedule";

export interface IProjectDetailPageProps {}

const data = {
    projectContractAddress: "1",
    projectIcon: "http://www.chemistry.hcmus.edu.vn/images/logo%20KHTN_REMAKE%201.png",
    projectBanner: "https://www.hcmus.edu.vn/images/z3336142106615_c6035997d22a0dbe3efa0a089aec7933.jpg",
    projectName: "HCMUS Coin",
    projectSlogan: "University of Science",
    tokenSymbol: "HCMUSC",
    goal: 650000,
    maxAllocation: 500,
    startDate: new Date(2023, 8, 15),
    createdDate: new Date(2023, 7, 23),
    endDate: new Date(2023, 11, 31, 23, 59),
    idoOpenDate: new Date(2023, 11, 31, 23, 59),
    idoCloseDate: new Date(2024, 0, 31, 23, 59),
    slug: "hcmus",
};

export default function ProjectDetailPage(_props: IProjectDetailPageProps) {
    const { projectSlug } = useParams();

    const { token: themeToken } = theme.useToken();
    const { startDate, endDate, idoOpenDate, idoCloseDate } = data;

    const bannerVariant = inferStatusBannerVariant({ startDate, endDate, idoOpenDate, idoCloseDate });
    const bannerStyle = prepareVariantStyle(bannerVariant, themeToken);

    const items: TabsProps["items"] = [
        {
            key: "project-description",
            label: "Description",
            children: <ProjectDescription content={"Content of Tab Pane 1"} />,
        },
        {
            key: "token-information",
            label: "Token Information",
            children: <ProjectTokenInformation data={{ swapRaito: "1000", symbol: "HIGH" }} />,
        },
        {
            key: "project-schedule",
            label: "Schedule",
            children: (
                <ProjectSchedule
                    data={{
                        startDate: startDate.toLocaleString(),
                        endDate: endDate.toLocaleString(),
                        idoStartDate: idoOpenDate.toLocaleString(),
                        idoEndDate: idoCloseDate.toLocaleString(),
                    }}
                />
            ),
        },
    ];

    return (
        <Space direction="vertical" style={{ width: "100%" }} size={24} className="project-detail-container">
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: <Link to={"/explore"}>Projects</Link>,
                    },
                    {
                        title: projectSlug,
                    },
                ]}
            />

            <Space direction="horizontal" align="center" size={32} className="project-detail-top">
                <Avatar
                    size={96}
                    src="https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2Fb8hp9tuojmjfwgcogi5zkuyrqv6v&w=96&q=70"
                />

                <Space direction="vertical" align="start" className="projet-detail-top-general">
                    <Typography.Title level={1}>Highstreet</Typography.Title>
                    <Typography.Text ellipsis>Shopify on an MMORPG</Typography.Text>
                </Space>
            </Space>

            <Row gutter={[{ lg: 16 }, 16]} className="project-detail-content">
                <Col xs={24} lg={16}>
                    <Carousel dotPosition="bottom" effect="scrollx">
                        <CoverItem src="https://polkastarter.com/_next/image?url=https%3A%2F%2Fassets.polkastarter.com%2F1ulyhxmwugy7h36cdur1buzha3wc&w=3840&q=75" />
                    </Carousel>
                </Col>

                <Col xs={24} lg={8}>
                    <Card bordered>
                        <Card.Meta
                            description={
                                <Space direction="vertical" size={8} style={{ width: "100%" }}>
                                    <Space
                                        direction="horizontal"
                                        align="start"
                                        size={32}
                                        className="project-detail-content-general"
                                    >
                                        <Space
                                            direction="vertical"
                                            align="start"
                                            className="project-detail-content-title"
                                        >
                                            <Typography.Text className="project-detail-content-allocation">
                                                $500,000
                                            </Typography.Text>
                                            <Typography.Text className="project-detail-content-meta">
                                                Maximum funding goal reached
                                            </Typography.Text>
                                        </Space>

                                        <Tooltip title="Ethereum">
                                            <div
                                                style={{ display: "flex", justifyContent: "center", marginLeft: "2px" }}
                                            >
                                                <EthSvg width="40px" height="40px" />
                                            </div>
                                        </Tooltip>
                                    </Space>

                                    <Progress
                                        showInfo={false}
                                        percent={60}
                                        strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
                                    />

                                    <Space direction="vertical" className="project-detail-content-info">
                                        <Space
                                            direction="horizontal"
                                            align="baseline"
                                            className="project-detail-content-info-title"
                                        >
                                            <Typography.Text>Allocation</Typography.Text>
                                            <hr />
                                            <Typography.Text>420</Typography.Text>
                                        </Space>

                                        <Space
                                            direction="horizontal"
                                            align="baseline"
                                            className="project-detail-content-info-title"
                                        >
                                            <Typography.Text>Price per token</Typography.Text>
                                            <hr />
                                            <Typography.Text>1</Typography.Text>
                                        </Space>
                                    </Space>

                                    <hr />

                                    <Typography.Text
                                        style={{
                                            color: "#838fa2",
                                            textAlign: "center",
                                            width: "100%",
                                            display: "block",
                                            fontWeight: 600
                                        }}
                                    >
                                        Successfully funded and closed on Oct 11, 2021.
                                    </Typography.Text>
                                </Space>
                            }
                            style={{
                                marginBottom: themeToken.paddingLG + 6,
                            }}
                        />

                        <div
                            className="project-detail-content-status"
                            style={{
                                height: themeToken.paddingLG + 6,
                                maxHeight: themeToken.paddingLG + 6,
                                borderRadius: `0 0 ${themeToken.borderRadiusLG}px ${themeToken.borderRadiusLG}px`,
                                paddingInline: themeToken.paddingLG,
                                backgroundColor: bannerStyle.backgroundColor,
                            }}
                        >
                            <Typography.Text strong ellipsis style={{ color: bannerStyle.color }}>
                                {bannerVariant}
                            </Typography.Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[{ lg: 40 }, 16]} className="project-detail-content">
                <Col xs={24} lg={16}>
                    <Tabs defaultActiveKey="token-information" items={items} />
                </Col>
            </Row>
        </Space>
    );
}
