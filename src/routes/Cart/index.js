import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Popconfirm, Row, Space, Typography } from "antd";
import OrderBookList from "components/OrderBookList";
import { useHistory } from "react-router-dom";
import useCart from "utils/useCart";

const Cart = () => {
  const history = useHistory();
  const { cartItems, removeFromCart, emptyCart } = useCart();

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          购物车
        </Typography.Title>
        {cartItems.length > 0 && (
          <Popconfirm
            placement="left"
            title="您确定要清空购物车吗？"
            okText="是"
            cancelText="否"
            onConfirm={emptyCart}
          >
            <Button icon={<DeleteOutlined />} danger>
              清空
            </Button>
          </Popconfirm>
        )}
      </Row>
      <Divider />
      <OrderBookList items={cartItems} onDelete={removeFromCart} />
      {cartItems.length > 0 && (
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
                onClick={() => history.push("/order")}
              >
                结算
              </Button>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Cart;
