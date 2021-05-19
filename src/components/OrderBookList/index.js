import { Button, Empty, List, Row, Typography } from "antd";
import OrderBookItem from "components/OrderBookItem";
import { useHistory } from "react-router-dom";
import { currencyFormat, totalSum } from "utils/helpers";

const OrderBookList = ({ items, readOnly = false }) => {
  const history = useHistory();

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      footer={
        <>
          {items?.length > 0 && (
            <Row justify="space-between">
              <p>共 {items.length} 件商品</p>
              <Typography.Title level={3}>
                总计 {currencyFormat(totalSum(items))}
              </Typography.Title>
            </Row>
          )}
        </>
      }
      renderItem={(item) => <OrderBookItem item={item} readOnly={readOnly} />}
      locale={{
        emptyText: (
          <Empty
            description={
              <span style={{ fontSize: "26px" }}>您的购物车内还没有商品</span>
            }
          >
            <Button
              type="primary"
              size="large"
              onClick={() => history.push("/")}
            >
              去购物
            </Button>
          </Empty>
        ),
      }}
    />
  );
};

export default OrderBookList;
