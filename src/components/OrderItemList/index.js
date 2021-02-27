import books from "@/assets/books";
import { List, Row, Typography } from "antd";
import OrderItem from "components/OrderItem";
import { currencyFormat, totalSum } from "utils/helpers";

const OrderItemList = ({ items = books, readOnly = false }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      footer={
        <Row justify="space-between">
          <p>共 {items.length} 件商品</p>
          <Typography.Title level={3}>
            总计 {currencyFormat(totalSum(items))}
          </Typography.Title>
        </Row>
      }
      renderItem={(item) => <OrderItem book={item} readOnly={readOnly} />}
    />
  );
};

export default OrderItemList;
