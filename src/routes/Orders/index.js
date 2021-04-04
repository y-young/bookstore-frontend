import books from "@/assets/books";
import OrderList from "@/components/OrderList";
import { Col, DatePicker, Divider, Input, Row, Statistic } from "antd";
import PageHeader from "components/PageHeader";
import BookTypeStatistics from "../../components/BookTypeStatistics";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Orders = () => {
  const items = books;

  return (
    <>
      <PageHeader title="订单">
        <Input.Search placeholder="搜索图书" />
        <RangePicker />
        <Divider />
      </PageHeader>
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic title="订单数量" value={items.length} />
        </Col>
        <Col span={8}>
          <Statistic title="商品数量" value={11} />
        </Col>
        <Col span={8}>
          <Statistic title="总金额" prefix={"￥"} value={1128} precision={2} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <OrderList books={items} />
        </Col>
        <Col>
          <Divider type="vertical" className={styles.divider} />
        </Col>
        <Col span={3}>
          <BookTypeStatistics />
        </Col>
      </Row>
    </>
  );
};

export default Orders;
