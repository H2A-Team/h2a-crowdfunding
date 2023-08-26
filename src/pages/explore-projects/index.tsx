import { LoadingOutlined } from "@ant-design/icons";
import { Col, Input, Pagination, PaginationProps, Row, Space, Typography, theme } from "antd";
import moment from "moment";
import { ElementRef, useRef, useState } from "react";
import { addCharacterBeforeString, formatNumberStrWithCommas } from "../../utils/common-utils";
import ProjectCard, { IProjectCardData } from "./components/project-card";
import StatisticCard from "./components/statistic-card";
import FundedProjectsIcon from "./components/statistic-card-icon/funded-projects";
import IconWrapper from "./components/statistic-card-icon/icon-wrapper";
import RaisedCapital from "./components/statistic-card-icon/raised-capital";
import UniqueParticipants from "./components/statistic-card-icon/unique-participants";
import "./index.scss";

const fakeCardData: IProjectCardData[] = [
    {
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
    },
    {
        projectContractAddress: "2",
        projectIcon:
            "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.18169-9/18557143_1051319464967745_4841699278094069503_n.png?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=m-AP2I0ZJtYAX_SB1cm&_nc_oc=AQnmGY6IV-OuSc8XEChR-G5MTOZa1bPcrvcTKiDJty3Aows9_llOykoVjtrDp032-cY&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfD-ivMyvmDOSfxONUOhkGi9t8LpJmJ3BlS08X4LP1wKaA&oe=650ECD19",
        projectBanner: "https://hcmussh.edu.vn/img/avatar.png?t=1649046939342",
        projectName: "HCMUSSH Coin",
        projectSlogan: "University of Social Sciences and Humanities",
        tokenSymbol: "HCMUSSHC",
        goal: 500000,
        maxAllocation: 350,
        startDate: new Date(2023, 7, 20),
        createdDate: new Date(2023, 7, 15),
        endDate: new Date(2023, 7, 24, 23, 59),
        idoOpenDate: new Date(2023, 7, 24, 23, 59),
        idoCloseDate: new Date(2023, 8, 24, 23, 59),
        slug: "ussh",
    },
    {
        projectContractAddress: "3",
        projectIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/HCMCUT.svg/120px-HCMCUT.svg.png",
        projectBanner:
            "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/135934418_2897486180486102_2318779580339329709_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8631f5&_nc_ohc=QtJ8WjR7U-gAX9NuRs2&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfCzQYzdfneUZKHOz2ayGlul4mtiOogSsBHUkExnOaXkgQ&oe=650EB35A",
        projectName: "HCMUT Coin",
        projectSlogan: "University of Technology",
        tokenSymbol: "HCMUTC",
        goal: 550000,
        maxAllocation: 400,
        startDate: new Date(2023, 7, 1),
        createdDate: new Date(2023, 6, 21),
        endDate: new Date(2023, 7, 15, 23, 59),
        idoOpenDate: new Date(2023, 7, 15, 23, 59),
        idoCloseDate: new Date(2023, 7, 20, 23, 59),
        slug: "hcmut",
    },
    {
        projectContractAddress: "4",
        projectIcon: "https://portal.uit.edu.vn/Styles/profi/images/logo186x150.png",
        projectBanner: "https://tuyensinh.uit.edu.vn/sites/default/files/uploads/images/201803/uit_dsc_0002_1-1.jpg",
        projectName: "UIT Coin",
        projectSlogan: "University of Information Technology",
        tokenSymbol: "UITC",
        goal: 600000,
        maxAllocation: 450,
        startDate: new Date(2023, 7, 1),
        createdDate: new Date(2023, 6, 30),
        endDate: new Date(2023, 7, 23, 23, 59),
        idoOpenDate: new Date(2023, 8, 23, 23, 59),
        idoCloseDate: new Date(2023, 9, 23, 23, 59),
        slug: "uit",
    },
    {
        projectContractAddress: "5",
        projectIcon:
            "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/327288048_573823947928315_897935455729963045_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=iKTa2BCjrf4AX8IoJL3&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfA3xshSg7yL9xjIdKskCCrm9gU8DZUuA4ZjIkDuek6LcA&oe=64EB6A36",
        projectBanner:
            "https://xdcs.cdnchinhphu.vn/446259493575335936/2023/8/22/truong-dai-hoc-kinh-te-luat-7779-16926939597611747043698.jpeg",
        projectName: "UEL Coin",
        projectSlogan: "University of Economics and Law",
        tokenSymbol: "UELC",
        goal: 620000,
        maxAllocation: 430,
        startDate: new Date(2023, 7, 1),
        createdDate: new Date(2023, 6, 24),
        endDate: new Date(2023, 9, 23, 23, 59),
        idoOpenDate: new Date(2023, 9, 23, 23, 59),
        idoCloseDate: new Date(2023, 10, 23, 23, 59),
        slug: "ueh",
    },
];

const fakeProjectList = () => {
    return new Array(5).fill(null).map((_, index) => {
        return {
            ...fakeCardData[index % fakeCardData.length],
            projectContractAddress: fakeCardData[index % fakeCardData.length].projectContractAddress.concat(
                index.toString()
            ),
        };
    });
};

const DEFAULT_PAGINATION = {
    current: 1,
    pageSize: 10,
    total: 0,
};

const DEFAULT_STATISTICS_STATE = {
    fundedProjects: -1,
    uniqueParticipants: -1,
    raisedCapital: -1,
};

export default function ExploreProjects() {
    const searchBarRef = useRef<ElementRef<"div">>(null);
    const debounceFuncRef = useRef<NodeJS.Timeout>();

    const { token } = theme.useToken();

    const [searchStr, setSearchStr] = useState("");
    const [pagination, setPagination] = useState<{
        current: number;
        pageSize: number;
        total: number;
    }>({ ...DEFAULT_PAGINATION, total: 50 });
    const [isLoading, setIsLoading] = useState(false);

    const [statistics, setStatistics] = useState<{
        fundedProjects: number;
        uniqueParticipants: number;
        raisedCapital: number;
    }>({
        ...DEFAULT_STATISTICS_STATE,
        fundedProjects: 111,
        uniqueParticipants: 35900,
        raisedCapital: 49729044,
    });
    const [projectsList, setProjectsList] = useState<IProjectCardData[]>(fakeProjectList());

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;

        if (debounceFuncRef.current) clearTimeout(debounceFuncRef.current);

        debounceFuncRef.current = setTimeout(() => setSearchStr(value), 500);
    };

    const onPaginationChange: PaginationProps["onChange"] = (current, pageSize) => {
        setPagination((val) => ({ ...val, current: current, pageSize: pageSize }));
        searchBarRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const prepareListToDisplay = () => {
        const searchQuery = searchStr.trim();
        const filteredList =
            searchQuery !== ""
                ? projectsList.filter(
                      (project) =>
                          project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.projectContractAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : projectsList;

        return {
            listTotalLength: filteredList.length,
            listToDisplay: filteredList
                .sort((a, b) => moment(a.createdDate).diff(moment(b.createdDate)))
                .slice(
                    pagination.current * pagination.pageSize - pagination.pageSize,
                    pagination.current * pagination.pageSize
                ),
        };
    };

    const listToDisplay = prepareListToDisplay();

    return (
        <>
            <Row gutter={[8, 24]} align={"middle"}>
                <Col xxl={9} xl={9} lg={9} md={24} xs={24}>
                    <Space align="center" direction="vertical">
                        <Typography>
                            <Typography.Title level={2} style={{ fontWeight: "bolder", margin: 0 }}>
                                Funded Projects
                            </Typography.Title>
                            <Typography.Title type="secondary" level={4} style={{ margin: 0 }}>
                                We bring new technologies to our community
                            </Typography.Title>
                        </Typography>
                    </Space>
                </Col>
                <Col xxl={15} xl={15} lg={15} md={24} xs={24}>
                    <Row gutter={[8, 8]}>
                        <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                            <StatisticCard
                                label="Funded Projects"
                                value={statistics.fundedProjects}
                                iconComponent={
                                    <IconWrapper
                                        color="rgb(245, 158, 11)"
                                        backgroundColor="rgba(245, 158, 11, 0.16)"
                                        icon={<FundedProjectsIcon />}
                                    />
                                }
                                textColor="rgb(245, 158, 11)"
                                formatters={[formatNumberStrWithCommas]}
                                loading={isLoading}
                            />
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                            <StatisticCard
                                label="Unique Participants"
                                value={statistics.uniqueParticipants}
                                iconComponent={
                                    <IconWrapper
                                        color="rgb(33, 188, 201)"
                                        backgroundColor="rgba(33, 188, 201, 0.16)"
                                        icon={<UniqueParticipants />}
                                    />
                                }
                                textColor="rgb(33, 188, 201)"
                                formatters={[formatNumberStrWithCommas]}
                                loading={isLoading}
                            />
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={8} xs={24}>
                            <StatisticCard
                                label="Raised Capital"
                                value={statistics.raisedCapital}
                                iconComponent={
                                    <IconWrapper
                                        color="rgb(71, 98, 225)"
                                        backgroundColor="rgba(71, 98, 225, 0.16)"
                                        icon={<RaisedCapital />}
                                    />
                                }
                                textColor="rgb(71, 98, 225)"
                                formatters={[formatNumberStrWithCommas, (str) => addCharacterBeforeString(str, "$")]}
                                loading={isLoading}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row ref={searchBarRef} className="explore__search-bar">
                <Col span={24}>
                    <div>
                        <Input
                            placeholder="Search by project name, token contract address or token symbol"
                            size="large"
                            allowClear
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="explore__projects-list-container" gutter={[24, 24]}>
                {isLoading ? (
                    <Col span={24}>
                        <Space
                            style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBlock: "24px",
                            }}
                            direction="vertical"
                        >
                            <LoadingOutlined style={{ fontSize: 32, color: token.colorPrimary }} spin />

                            <Typography.Text style={{ color: token.colorPrimary }}>Loading ...</Typography.Text>
                        </Space>
                    </Col>
                ) : (
                    listToDisplay.listToDisplay.map((project) => (
                        <Col key={project.projectContractAddress} xxl={8} xl={8} lg={12} md={12} xs={24}>
                            <ProjectCard data={project} showStatus />
                        </Col>
                    ))
                )}
            </Row>

            <Row className="explore__projects-list-pagination">
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Pagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        showSizeChanger
                        onChange={onPaginationChange}
                        total={listToDisplay.listTotalLength}
                        disabled={isLoading}
                    />
                </Col>
            </Row>
        </>
    );
}
