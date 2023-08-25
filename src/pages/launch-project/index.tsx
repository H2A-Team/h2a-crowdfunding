import { Card, Col, Row, Space, Typography } from "antd";
import CreateProjectForm, { IProjectFormData } from "./components/create-project-form";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function LaunchProject() {
    const navigate = useNavigate();

    const handleFormCancel = () => {
        navigate("/explore");
    };

    const handleFormSubmit = (formData: IProjectFormData) => {
        console.log({ formData });
    };

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
