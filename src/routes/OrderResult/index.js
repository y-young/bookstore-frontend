import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import OrderItemList from "components/OrderItemList";
import { useHistory } from "react-router-dom";
import styles from "./index.less";

const OrderResult = () => {
  const history = useHistory();

  return (
    <>
      <Row gutter={32} align="middle">
        <Col flex="70px">
          <CheckCircleFilled className={styles.successIcon} />
        </Col>
        <Col flex={1}>
          <Typography.Title level={2} className={styles.resultTitle}>
            订单已完成
          </Typography.Title>
          <p className={styles.resultSubTitle}>以下是您的商品信息</p>
        </Col>
        <Col className={styles.orderInfo}>
          订单编号：1
          <br />
          时间：{new Date().toLocaleString()}
        </Col>
      </Row>
      <Divider />
      <OrderItemList readOnly />
      <Row justify="end">
        <Col>
          <Space>
            <Button size="large" onClick={() => history.push("/orders")}>
              查看订单
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => history.push("/")}
            >
              继续购物
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default OrderResult;
