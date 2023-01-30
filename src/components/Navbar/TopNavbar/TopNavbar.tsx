import React from "react";
import { Col, Row, Typography, Input } from "antd";
import "./TopNavbar.css";
import {
    UserOutlined,
    HeartFilled,
    ShoppingCartOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { Search } = Input;

const TopNavbar: React.FC = () => {
    const onSearch = (value: string) => {
        console.log(value);
    };
    return (
        <div className="container topNavbarHeader">
            <Row justify="space-between" align="middle">
                <Col
                    span={4}
                    xs={{ span: 12, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    md={{ span: 4, order: 1 }}
                    lg={{ span: 4, order: 1 }}
                >
                    <Title className="topNavbarLogo">Aladin</Title>
                </Col>
                <Col
                    span={14}
                    xs={{ span: 24, order: 3 }}
                    sm={{ span: 12, order: 1 }}
                    md={{ span: 14, order: 2 }}
                    lg={{ span: 14, order: 2 }}
                >
                    <Search
                        placeholder="input search text"
                        size="large"
                        onSearch={onSearch}
                        enterButton
                    />
                </Col>
                <Col
                    span={6}
                    xs={{ span: 12, order: 2 }}
                    sm={{ span: 12, order: 1 }}
                    md={{ span: 6, order: 3 }}
                    lg={{ span: 6, order: 3 }}
                >
                    <div className="navbarTopIconWrapper">
                        <HeartFilled className="icon" />
                        <UserOutlined className="icon" />
                        <ShoppingCartOutlined className="icon" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TopNavbar;
