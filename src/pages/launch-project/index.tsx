import { Card, Col, Row, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import ConnectWalletGuide from "../../components/connect-wallet-guide";
import { useAntMessage } from "../../contexts/ant-mesage";
import { useBlockUI } from "../../contexts/block-ui";
import { useSmartContract } from "../../contexts/smart-contract";
import { CreateProjectDTO } from "../../core/dto";
import CreateProjectForm, { IProjectFormData } from "./components/create-project-form";
import "./styles.scss";

export default function LaunchProject() {
    const navigate = useNavigate();
    const { address, contract } = useSmartContract();

    const { blockUI, unblockUI } = useBlockUI();
    const antMessage = useAntMessage();

    const handleFormCancel = () => {
        navigate("/explore");
    };

    const handleFormSubmit = async (formData: IProjectFormData) => {
        const payload: CreateProjectDTO = {
            name: formData.name,
            slug: formData.slug,
            shortDescription: formData.shortDescription,
            description: formData.description,
            logoUrl: formData.logoUrl,
            coverBackgroundUrl: formData.coverBackgroundUrl,
            maxAllocation: formData.maxAllocation,
            totalRaise: formData.totalRaise,
            tokenSymbol: formData.tokenSymbol,
            tokenSwapRaito: formData.tokenSwapRaito.toString(),
            opensAt: formData.fundingPeriod.startsAt.getTime(),
            endsAt: formData.fundingPeriod.endsAt.getTime(),
            idoStartsAt: formData.tokenClaimingPeriod.startsAt.getTime(),
            idoEndsAt: formData.tokenClaimingPeriod.endsAt.getTime(),
        };

        try {
            blockUI("Transaction is in progess, please wait ...");
            await contract.call("createProject", [payload]);
            unblockUI();

            // console.log(result);
            // const { blockHash, transactionHash } = result.receipt;

            navigate("/explore");
        } catch (error) {
            unblockUI();
            // console.log(error);
            antMessage.error("Transaction failed, please try again later!");
        }
    };

    if (!address) {
        return <ConnectWalletGuide />;
    }

    return (
        <Row align="middle" justify="center">
            <Col lg={18} md={20} xs={24}>
                <Card className="launch-project-container">
                    <Space align="center" direction="vertical" size="middle">
                        <Typography className="launch-project-title">
                            <Typography.Title level={2}>Launch a Project</Typography.Title>
                            <Typography.Text type="danger">
                                <span>*</span> All fields are required!
                            </Typography.Text>
                        </Typography>

                        <CreateProjectForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
                    </Space>
                </Card>
            </Col>
        </Row>
    );
}
