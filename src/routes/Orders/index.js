import books from "@/assets/books";
import OrderList from "@/components/OrderList";
import {
  Col,
  DatePicker,
  Divider,
  Input,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Orders = () => {
  const items = books;

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          订单
        </Typography.Title>
        <Col>
          <Space>
            <Input.Search placeholder="搜索图书" />
            <RangePicker />
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic title="订单数量" value={items.length} />
        </Col>
        <Col span={8}>
          <Statistic title="商品数量" value={11} />
        </Col>
        <Col span={8}>
          <Statistic title="总金额" value={1128} precision={2} />
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
          <Row gutter={8} className={styles.bookStatistics}>
            <Col span={18}>外国文学</Col>
            <Col span={6}>10</Col>
            <Col span={18}>科幻小说</Col>
            <Col span={6}>23</Col>
            <Col span={18}>计算机</Col>
            <Col span={6}>3</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Orders;