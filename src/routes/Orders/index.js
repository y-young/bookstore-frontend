import books from "@/assets/books";
import useRequest from "@umijs/use-request";
import { Col, DatePicker, Divider, Input, Row, Spin, Statistic } from "antd";
import BookTypeStatistics from "components/BookTypeStatistics";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Orders = () => {
  const items = books;
  const { data, loading } = useRequest("/orders/my", { initialData: [] });
  const { data: statistics, loading: statisticsLoading } = useRequest(
    "/orders/my/statistics",
    { initialData: [] }
  );

  return (
    <>
      <PageHeader title="订单">
        <Input.Search placeholder="搜索书籍" />
        <RangePicker />
      </PageHeader>
      <Spin spinning={loading || statisticsLoading}>
        <Row gutter={16} className={styles.statistics}>
          <Col span={8}>
            <Statistic title="订单数量" value={items.length} />
          </Col>
          <Col span={8}>
            <Statistic title="商品数量" value={11} />
          </Col>
          <Col span={8}>
            <Statistic
              title="总金额"
              prefix={"￥"}
              value={1128}
              precision={2}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={20}>
            <OrderList orders={data} />
          </Col>
          <Col>
            <Divider type="vertical" className={styles.divider} />
          </Col>
          <Col span={3}>
            <BookTypeStatistics data={statistics} />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default Orders;
