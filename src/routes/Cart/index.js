import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, Col, Popconfirm, Row, Space } from "antd";
import OrderBookList from "components/OrderBookList";
import PageHeader from "components/PageHeader";
import { useHistory } from "react-router-dom";
import useCart from "utils/useCart";

const Cart = () => {
  const history = useHistory();
  const { cartItems, removeFromCart, emptyCart } = useCart();
  const { run, loading } = useRequest(
    { method: "post", url: "/orders", data: cartItems },
    {
      manual: true,
      onSuccess: (data) => {
        history.push(`/orders/${data.id}`);
      },
    }
  );

  return (
    <>
      <PageHeader title="购物车">
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
      </PageHeader>
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
                onClick={run}
                loading={loading}
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
