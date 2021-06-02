import { Button, Col, Empty, Image, List, Space } from "antd";
import { useHistory } from "react-router-dom";
import { currencyFormat, getCoverUrl } from "utils/helpers";
import styles from "./index.less";

const OrderList = ({ orders, loading }) => {
  const history = useHistory();

  return (
    <List
      itemLayout="horizontal"
      dataSource={orders}
      rowKey="id"
      loading={loading}
      renderItem={(order) => {
        const { id, items, total, totalAmount, time } = order;
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
                      src={getCoverUrl(item.book.cover)}
                      width={60}
                      height={60}
                      key={item.book.id}
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
