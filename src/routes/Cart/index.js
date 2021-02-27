import books from "@/assets/books";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Popconfirm, Row, Space, Typography } from "antd";
import OrderItemList from "components/OrderItemList";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const history = useHistory();

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          购物车
        </Typography.Title>
        <Popconfirm
          placement="left"
          title="您确定要清空购物车吗？"
          okText="是"
          cancelText="否"
        >
          <Button icon={<DeleteOutlined />} danger>
            清空
          </Button>
        </Popconfirm>
      </Row>
      <Divider />
      <OrderItemList items={books} />
      <Row justify="end">
        <Col>
          <Space>
            <Button size="large" onClick={() => history.push("/")}>
              继续购物
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => history.push("/result")}
            >
              结算
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
