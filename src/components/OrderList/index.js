import { Button, Col, Empty, Image, List, Space } from "antd";
import { useHistory } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const OrderList = ({ books }) => {
  const history = useHistory();

  return (
    <List
      itemLayout="horizontal"
      dataSource={books}
      renderItem={(book) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => history.push("/order")}>
              查看详情
            </Button>,
          ]}
          className={styles.orderListItem}
        >
          <List.Item.Meta
            avatar={
              <Space>
                <Image src={book.cover} width={60} height={60} />
                <Image src={book.cover} width={60} height={60} />
                <Image src={book.cover} width={60} height={60} />
                <div className={styles.booksExtra}>+3</div>
              </Space>
            }
            title={"时间：2021-03-11 11:11:11"}
            description={String(book.amount ? book.amount : 1) + " 件商品"}
            className={styles.orderBookItems}
          />
          <Col flex="1 1 50px" className={styles.orderTotal}>
            {currencyFormat(book.price)}{" "}
          </Col>
        </List.Item>
      )}
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
