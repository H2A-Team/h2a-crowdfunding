import { Card, Space, Tooltip, Typography, theme } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import EthSvg from "../../../../components/svg-components/eth-svg";
import { formatNumberStrWithCommas } from "../../../../utils/common-utils";
import ProjectCardBanner, { IProjectCardBannerProps } from "./components/project-card-banner";
import "./index.scss";

export interface IProjectCardData {
    projectContractAddress: string;
    projectIcon: string;
    projectBanner: string;
    projectName: string;
    projectSlogan: string;
    tokenSymbol: string;
    goal: number;
    maxAllocation: number;
    createdDate: Date;
    startDate: Date;
    endDate: Date;
    idoOpenDate: Date;
    idoCloseDate: Date;
}

interface IProjectCardProps {
    data: IProjectCardData;
    showStatus?: boolean;
    detailPath?: string;
}

const ICON_SIZE = 88;

const enum STATUS_BANNER_VARIANT {
    UPCOMING = "Upcoming",
    FUNDING = "Funding",
    FUNDING_CLOSED = "Funding Closed",
    TOKEN_CLAIMING = "Token Claiming",
    CLOSED = "Closed",
    UNKNOWN = "Unknown",
}

export default function ProjectCard(props: IProjectCardProps) {
    const { data, detailPath, showStatus } = props;
    const {
        projectIcon,
        projectBanner,
        projectName,
        projectSlogan,
        tokenSymbol,
        goal,
        maxAllocation,
        endDate,
        startDate,
        idoOpenDate,
        idoCloseDate,
    } = data;

    const navigate = useNavigate();
    const { token } = theme.useToken();

    const onClick = () => {
        if (detailPath && detailPath !== "") navigate(detailPath);
    };

    const cardTitle = () => {
        return (
            <div style={{ width: "100%", display: "flex" }}>
                <div style={{ width: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
                    <Typography.Title level={4} style={{ margin: 0, width: "100%" }} ellipsis>
                        {projectName}
                    </Typography.Title>
                    <Typography.Text style={{ color: token.colorPrimary, width: "100%" }} ellipsis>
                        {tokenSymbol}
                    </Typography.Text>
                </div>
                <Tooltip title="Ethereum">
                    <div style={{ display: "flex", justifyContent: "center", marginLeft: "2px" }}>
                        <EthSvg width="30px" height="30px" />
                    </div>
                </Tooltip>
            </div>
        );
    };

    const cardDescription = () => {
        return (
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
                <Tooltip title={projectSlogan}>
                    <Typography.Text type="secondary" ellipsis>
                        {projectSlogan}
                    </Typography.Text>
                </Tooltip>

                <div style={{ display: "flex", gap: "4px" }}>
                    <Typography.Text type="secondary" ellipsis>
                        Goal
                    </Typography.Text>
                    <div
                        style={{
                            flex: 1,
                            borderBottom: `1px dotted ${token.colorTextSecondary}`,
                            transform: "translateY(-6px)",
                        }}
                    ></div>
                    <Typography.Text strong>{formatNumberStrWithCommas(goal.toString())}</Typography.Text>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                    <Typography.Text type="secondary" ellipsis>
                        Max Allocation
                    </Typography.Text>
                    <div
                        style={{
                            flex: 1,
                            borderBottom: `1px dotted ${token.colorTextSecondary}`,
                            transform: "translateY(-6px)",
                        }}
                    ></div>
                    <Typography.Text strong>{formatNumberStrWithCommas(maxAllocation.toString())}</Typography.Text>
                </div>
            </Space>
        );
    };

    const inferStatusBannerVariant = (): STATUS_BANNER_VARIANT => {
        const currentTime = moment(new Date());

        // project has closed
        if (moment(endDate).diff(currentTime) < 0 && moment(idoCloseDate).diff(currentTime) < 0)
            return STATUS_BANNER_VARIANT.CLOSED;

        // project has ended the funding phrase
        if (moment(endDate).diff(currentTime) < 0 && moment(idoOpenDate).diff(currentTime) > 0)
            return STATUS_BANNER_VARIANT.FUNDING_CLOSED;

        // project which has not started is considered as upcoming project
        if (moment(startDate).diff(currentTime) > 0) return STATUS_BANNER_VARIANT.UPCOMING;

        // project is in the IDO state (claiming token)
        if (moment(idoOpenDate).diff(currentTime) < 0 && moment(idoCloseDate).diff(currentTime) > 0)
            return STATUS_BANNER_VARIANT.TOKEN_CLAIMING;

        // project is funding
        if (moment(startDate).diff(currentTime) < 0 && moment(endDate).diff(currentTime) > 0)
            return STATUS_BANNER_VARIANT.FUNDING;

        // default case
        return STATUS_BANNER_VARIANT.UNKNOWN;
    };

    const prepareVariantStyle = (variant: STATUS_BANNER_VARIANT): { backgroundColor: string; color: string } => {
        switch (variant) {
            case STATUS_BANNER_VARIANT.UPCOMING: {
                return {
                    backgroundColor: "#CCE2FF",
                    color: token.colorInfo,
                };
            }

            case STATUS_BANNER_VARIANT.FUNDING: {
                return {
                    backgroundColor: "#CBFF92",
                    color: token.colorSuccess,
                };
            }

            case STATUS_BANNER_VARIANT.TOKEN_CLAIMING: {
                return {
                    backgroundColor: "#FFD6B4",
                    color: token.colorPrimary,
                };
            }

            case STATUS_BANNER_VARIANT.CLOSED: {
                return {
                    backgroundColor: token.colorTextSecondary,
                    color: token.colorWhite,
                };
            }

            case STATUS_BANNER_VARIANT.FUNDING_CLOSED: {
                return {
                    backgroundColor: "#FFC2B5",
                    color: token.colorError,
                };
            }

            default: {
                return {
                    backgroundColor: token.colorTextSecondary,
                    color: token.colorWhite,
                };
            }
        }
    };

    const prepareDateBanner = (variant: STATUS_BANNER_VARIANT): IProjectCardBannerProps["date"] => {
        switch (variant) {
            case STATUS_BANNER_VARIANT.UPCOMING: {
                return {
                    label: "Starts on",
                    value: moment(startDate).format("MMM Do YYYY"),
                };
            }

            case STATUS_BANNER_VARIANT.FUNDING: {
                return {
                    label: "Ends on",
                    value: moment(endDate).format("MMM Do YYYY"),
                };
            }

            case STATUS_BANNER_VARIANT.TOKEN_CLAIMING: {
                return {
                    label: "Claim before",
                    value: moment(idoCloseDate).format("MMM Do YYYY"),
                };
            }

            case STATUS_BANNER_VARIANT.CLOSED: {
                return {
                    label: "Ended on",
                    value: moment(idoCloseDate).format("MMM Do YYYY"),
                };
            }

            case STATUS_BANNER_VARIANT.FUNDING_CLOSED: {
                return {
                    label: "Claim token on",
                    value: moment(idoOpenDate).format("MMM Do YYYY"),
                };
            }

            default: {
                return undefined;
            }
        }
    };

    const bannerVariant = inferStatusBannerVariant();
    const bannerStyle = prepareVariantStyle(bannerVariant);
    const dateBanner = prepareDateBanner(bannerVariant);

    return (
        <Link to={"#"} className="project-card-wrapper">
            <Card
                className="project-card"
                hoverable={true}
                cover={
                    projectBanner &&
                    projectBanner !== "" && (
                        <ProjectCardBanner
                            src={projectBanner}
                            cardIconSrc={projectIcon}
                            cardIconEdgeSize={ICON_SIZE}
                            dateBannerStyle={bannerStyle}
                            date={dateBanner}
                        />
                    )
                }
                onClick={onClick}
            >
                <Card.Meta
                    title={cardTitle()}
                    description={cardDescription()}
                    style={{ marginBottom: showStatus ? token.paddingLG + 6 : undefined, marginTop: ICON_SIZE / 2 - 6 }}
                />
                {showStatus && (
                    <div
                        className="project-card__status-indicator-banner"
                        style={{
                            height: token.paddingLG + 6,
                            maxHeight: token.paddingLG + 6,
                            borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
                            paddingInline: token.paddingLG,
                            backgroundColor: bannerStyle.backgroundColor,
                        }}
                    >
                        <div className="status-indicator-banner__status-indicator">
                            <Typography.Text
                                strong
                                ellipsis
                                style={{ color: bannerStyle.color, textTransform: "uppercase" }}
                            >
                                {bannerVariant}
                            </Typography.Text>
                        </div>
                    </div>
                )}
            </Card>
        </Link>
    );
}
