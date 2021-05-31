import { CheckCircleFilled } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, Col, Divider, Row, Space, Spin, Typography } from "antd";
import OrderBookList from "components/OrderBookList";
import { useHistory, useParams } from "react-router-dom";
import styles from "./index.less";

const OrderDetail = () => {
  const history = useHistory();
  const { orderId } = useParams();
  const { data, loading } = useRequest(`/orders/${orderId}`);

  return (
    <Spin spinning={loading}>
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
          订单编号：{data?.id}
          <br />
          时间：{new Date(data?.time).toLocaleString()}
        </Col>
      </Row>
      <Divider />
      <OrderBookList readOnly items={data?.items} amount={data?.totalAmount} />
      <Row justify="end">
        <Col>
          <Space>
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
    </Spin>
  );
};

export default OrderDetail;
