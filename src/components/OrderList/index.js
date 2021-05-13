import { Button, Col, Empty, Image, List, Space } from "antd";
import { useHistory } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const OrderList = ({ orders }) => {
  const history = useHistory();

  return (
    <List
      itemLayout="horizontal"
      dataSource={orders}
      rowKey="id"
      renderItem={(order) => {
        const { id, items, total, time } = order;
        const totalAmount = items
          .map((item) => item.amount)
          .reduce((prev, curr) => prev + curr);
        return (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => history.push(`/orders/${id}`)}
              >
                查看详情
              </Button>,
            ]}
            className={styles.orderListItem}
          >
            <List.Item.Meta
              avatar={
                <Space>
                  {items.slice(0, 2).map((item) => (
                    <Image
                      src={item.cover}
                      width={60}
                      height={60}
                      key={item.id}
                    />
                  ))}
                  {items.length > 2 && (
                    <div className={styles.booksExtra}>+{items.length - 2}</div>
                  )}
                </Space>
              }
              title={`时间：${new Date(time).toLocaleString()}`}
              description={`${totalAmount} 件商品`}
              className={styles.orderBookItems}
            />
            <Col flex="1 1 50px" className={styles.orderTotal}>
              {currencyFormat(total)}{" "}
            </Col>
          </List.Item>
        );
      }}
      locale={{
        emptyText: (
          <Empty
            description={<span style={{ fontSize: "26px" }}>您还没有订单</span>}
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

export default OrderList;
