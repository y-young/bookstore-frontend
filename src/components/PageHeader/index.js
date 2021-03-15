import { Col, Divider, Row, Space, Typography } from "antd";

const PageHeader = ({ title, children, span }) => {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          {title}
        </Typography.Title>
        <Col span={span} style={{ textAlign: "end" }}>
          <Space>{children}</Space>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default PageHeader;
