import { CheckCircleFilled } from "@ant-design/icons";
import { Col, Divider, Row, Typography } from "antd";
import OrderItemList from "components/OrderItemList";
import styles from "./index.less";

const OrderResult = () => {
  return (
    <>
      <Row gutter={32} align="middle">
        <Col>
          <CheckCircleFilled className={styles.successIcon} />
        </Col>
        <Col>
          <Typography.Title level={2} className={styles.resultTitle}>
            交易已完成
          </Typography.Title>
          <p className={styles.resultSubTitle}>以下是您的订单信息</p>
        </Col>
      </Row>
      <Divider />
      <OrderItemList readOnly />
    </>
  );
};

export default OrderResult;
