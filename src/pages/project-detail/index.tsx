import {
    Avatar,
    Breadcrumb,
    Button,
    Card,
    Carousel,
    Col,
    Progress,
    Row,
    Skeleton,
    Space,
    Tabs,
    Tooltip,
    Typography,
    theme,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EthSvg from "../../components/svg-components/eth-svg";
import { useSmartContract } from "../../contexts/smart-contract";
import { formatNumberStrWithCommas } from "../../utils/common-utils";
import { inferStatusBannerVariant, prepareVariantStyle } from "../../utils/project-card";
import CoverItem from "./components/cover-item";
import { ProjectDescription } from "./components/project-description";
import ProjectSchedule from "./components/project-schedule";
import ProjectTokenInformation from "./components/project-token-information";
import "./styles.scss";
import moment from "moment";
import StakeModal from "./components/stake-modal";
import { STATUS_BANNER_VARIANT } from "../../constants/project-card";

export interface IProjectDetailPageProps {}

interface IProjectDetail {
    id: number;
    owner: string;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    logoUrl: string;
    projectBanner: string;
    totalRaise: number;
    maxAllocation: number;
    tokenSymbol: string;
    tokenSwapRaito: string;
    createdAt: Date;
    opensAt: Date;
    endsAt: Date;
    idoStartsAt: Date;
    idoEndsAt: Date;
    currentRaise: number;
    totalParticipants: number;
    status: string;
}

export default function ProjectDetailPage(_props: IProjectDetailPageProps) {
    const { projectSlug } = useParams();
    const { contract } = useSmartContract();
    const { token: themeToken } = theme.useToken();
    const { address } = useSmartContract();

    const [project, setProject] = useState<IProjectDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [stakModal, setStakeModal] = useState({ show: false });

    const fetchProject = async () => {
        try {
            const result = await contract.call("getProjectDetail", [projectSlug]);
            setIsLoading(false);

            const mappedResult: IProjectDetail = {
                id: result.id.toNumber(),
                owner: result.owner,
                slug: result.slug,
                name: result.name,
                shortDescription: result.shortDescription,
                description: result.description,
                logoUrl: result.logoUrl,
                projectBanner: result.coverBackgroundUrl,
                totalRaise: result.allocation.totalRaise.toNumber(),
                maxAllocation: result.allocation.maxAllocation.toNumber(),
                tokenSymbol: result.tokenInformation.symbol,
                tokenSwapRaito: result.tokenInformation.swapRaito,
                createdAt: new Date(result.schedule.createdAt.toNumber()),
                opensAt: new Date(result.schedule.opensAt.toNumber()),
                endsAt: new Date(result.schedule.endsAt.toNumber()),
                idoStartsAt: new Date(result.schedule.idoStartsAt.toNumber()),
                idoEndsAt: new Date(result.schedule.idoEndsAt.toNumber()),
                totalParticipants: result.totalParticipants.toNumber(),
                currentRaise: result.currentRaise.toNumber(),
                status: raisingStatus(result.currentRaise.toNumber(), result.allocation.totalRaise.toNumber()),
            };

            setProject(mappedResult);
        } catch (error: any) {
            setIsLoading(false);
            console.log(error.reason);
        }
    };

    useEffect(() => {
        if (!contract) {
            return;
        }

        fetchProject();
    }, [projectSlug, contract]);

    const projectLoaded = !isLoading && project;

    const bannerVariant = inferStatusBannerVariant({
        startDate: project?.opensAt || new Date(),
        endDate: project?.endsAt || new Date(),
        idoOpenDate: project?.idoStartsAt || new Date(),
        idoCloseDate: project?.idoEndsAt || new Date(),
    });
    const bannerStyle = prepareVariantStyle(bannerVariant, themeToken);

    return (
        <>
            <Space direction="vertical" style={{ width: "100%" }} size={24} className="project-detail-container">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to={"/explore"}>Projects</Link>,
                        },
                        {
                            title: project?.name,
                        },
                    ]}
                />
                <Space direction="horizontal" align="center" size={32} className="project-detail-top">
                    {!projectLoaded && (
                        <>
                            <Skeleton.Avatar active shape="circle" size={"large"} />
                            <Space direction="vertical" align="start" className="projet-detail-top-general">
                                <Skeleton active paragraph={{ rows: 1 }} />
                            </Space>
                        </>
                    )}
                    {projectLoaded && (
                        <>
                            <Avatar size={96} src={project.logoUrl} />
                            <Space direction="vertical" align="start" className="projet-detail-top-general">
                                <Typography.Title level={1}>{project.name}</Typography.Title>
                                <Typography.Text ellipsis>{project.shortDescription}</Typography.Text>
                            </Space>
                        </>
                    )}
                </Space>
                <Row gutter={[{ lg: 16 }, 16]} className="project-detail-content">
                    <Col xs={24} lg={16}>
                        {!projectLoaded && <Skeleton.Input active block size="large" />}
                        {projectLoaded && (
                            <Carousel dotPosition="bottom" effect="scrollx">
                                <CoverItem src={project.projectBanner} />
                            </Carousel>
                        )}
                    </Col>
                    <Col xs={24} lg={8}>
                        <Card bordered>
                            {!projectLoaded && <Skeleton active />}
                            {projectLoaded && (
                                <>
                                    {" "}
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
                                                        size={projectLoaded ? 0 : 1}
                                                        style={{ width: "100%" }}
                                                    >
                                                        {project.status === "open" && (
                                                            <>
                                                                <Typography.Text className="project-detail-content-meta">
                                                                    Target
                                                                </Typography.Text>
                                                                <Typography.Text className="project-detail-content-allocation">
                                                                    {formatNumberStrWithCommas(project.totalRaise)} ETH
                                                                </Typography.Text>
                                                            </>
                                                        )}
                                                        {project.status === "funding" && (
                                                            <>
                                                                <Typography.Text className="project-detail-content-meta">
                                                                    Total Raised
                                                                </Typography.Text>
                                                                <Typography.Text className="project-detail-content-allocation">
                                                                    {formatNumberStrWithCommas(project.currentRaise)}{" "}
                                                                    ETH
                                                                </Typography.Text>
                                                            </>
                                                        )}
                                                        {project.status === "complete" && (
                                                            <>
                                                                <Typography.Text className="project-detail-content-allocation">
                                                                    {formatNumberStrWithCommas(project.totalRaise)} ETH
                                                                </Typography.Text>
                                                                <Typography.Text className="project-detail-content-meta">
                                                                    Maximum funding goal reached
                                                                </Typography.Text>
                                                            </>
                                                        )}
                                                    </Space>
                                                    <Tooltip title="Ethereum">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                marginLeft: "2px",
                                                            }}
                                                        >
                                                            <EthSvg width="40px" height="40px" />
                                                        </div>
                                                    </Tooltip>
                                                </Space>
                                                <Progress
                                                    showInfo={false}
                                                    percent={project.currentRaise / project.totalRaise}
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
                                                        <Typography.Text>
                                                            {formatNumberStrWithCommas(project.maxAllocation)} ETH
                                                        </Typography.Text>
                                                    </Space>
                                                    <Space
                                                        direction="horizontal"
                                                        align="baseline"
                                                        className="project-detail-content-info-title"
                                                    >
                                                        <Typography.Text>Investors</Typography.Text>
                                                        <hr />
                                                        <Typography.Text>{project.totalParticipants}</Typography.Text>
                                                    </Space>
                                                    <Space
                                                        direction="horizontal"
                                                        align="baseline"
                                                        className="project-detail-content-info-title"
                                                    >
                                                        <Typography.Text>Token Symbol</Typography.Text>
                                                        <hr />
                                                        <Typography.Text>
                                                            {project.tokenSymbol || "TBA"}
                                                        </Typography.Text>
                                                    </Space>
                                                </Space>

                                                {address && bannerVariant === STATUS_BANNER_VARIANT.FUNDING && (
                                                    <Button
                                                        type="primary"
                                                        block
                                                        size="large"
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                        onClick={() => setStakeModal({ show: true })}
                                                    >
                                                        Stake Money
                                                    </Button>
                                                )}
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
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[{ lg: 40 }, 16]} className="project-detail-content">
                    <Col xs={24} lg={16}>
                        {!projectLoaded && <Skeleton active paragraph={{ rows: 5 }} />}
                        {projectLoaded && (
                            <Tabs
                                size="large"
                                defaultActiveKey="project-description"
                                items={[
                                    {
                                        key: "project-description",
                                        label: "Description",
                                        children: <ProjectDescription content={project.description} />,
                                    },
                                    {
                                        key: "token-information",
                                        label: "Token Information",
                                        children: (
                                            <ProjectTokenInformation
                                                data={{
                                                    swapRaito: project.tokenSwapRaito,
                                                    symbol: project.tokenSymbol,
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        key: "project-schedule",
                                        label: "Schedule",
                                        children: (
                                            <ProjectSchedule
                                                data={{
                                                    startDate: moment(project.opensAt).toLocaleString(),
                                                    endDate: moment(project.endsAt).toLocaleString(),
                                                    idoStartDate: moment(project.idoStartsAt).toLocaleString(),
                                                    idoEndDate: moment(project.idoEndsAt).toLocaleString(),
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        )}
                    </Col>
                </Row>
            </Space>

            <StakeModal
                show={stakModal.show}
                title={"Stake in project"}
                onConfirm={() => {}}
                onCancel={() => setStakeModal({ ...stakModal, show: false })}
            />
        </>
    );
}

function raisingStatus(currentRaise: number, totalRaise: number): string {
    if (currentRaise >= totalRaise) {
        return "complete";
    }

    if (currentRaise > 0) {
        return "funding";
    }

    return "open";
}
