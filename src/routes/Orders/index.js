import useRequest from "@umijs/use-request";
import { Col, DatePicker, Divider, Input, Row, Statistic } from "antd";
import BookTypeStatistics from "components/BookTypeStatistics";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";
import { useState } from "react";
import { getApiUrlWithDateRange } from "utils/helpers";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Orders = () => {
  const [bookTitle, setBookTitle] = useState("");
  const {
    run: fetchOrderStatistics,
    data: orderStatistics,
    loading: orderStatisticsLoading,
  } = useRequest(
    (startDate, endDate) =>
      getApiUrlWithDateRange("/users/my/statistics", startDate, endDate),
    { initialData: [] }
  );
  const {
    run: fetchOrders,
    data: orders,
    loading: ordersLoading,
  } = useRequest(
    (startDate, endDate) =>
      getApiUrlWithDateRange("/orders/my", startDate, endDate) +
      `&bookTitle=${bookTitle}`,
    { initialData: [], refreshDeps: [bookTitle] }
  );
  const {
    run: fetchBookStatistics,
    data: bookStatistics,
    loading: bookStatisticsLoading,
  } = useRequest(
    (startDate, endDate) =>
      getApiUrlWithDateRange("/orders/my/statistics", startDate, endDate),
    { initialData: [] }
  );

  const onDateRangeChange = async (_, dateStrings) => {
    const [start, end] = dateStrings;
    if (!start || !end) {
      await fetchOrders();
      await fetchOrderStatistics();
      await fetchBookStatistics();
      return;
    }
    await fetchOrders(start, end);
    await fetchOrderStatistics(start, end);
    await fetchBookStatistics(start, end);
  };

  return (
    <>
      <PageHeader title="订单">
        <Input.Search
          placeholder="搜索书籍"
          onSearch={(keyword) => setBookTitle(keyword)}
        />
        <RangePicker onChange={onDateRangeChange} />
      </PageHeader>
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic
            title="订单数量"
            value={orderStatistics?.orderCount}
            loading={orderStatisticsLoading}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="商品数量"
            value={orderStatistics?.bookCount ? orderStatistics?.bookCount : 0} // Fix null when no orders
            loading={orderStatisticsLoading}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="总金额"
            prefix={"￥"}
            value={orderStatistics?.total / 100}
            precision={2}
            loading={orderStatisticsLoading}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <OrderList orders={orders} loading={ordersLoading} />
        </Col>
        <Col>
          <Divider type="vertical" className={styles.divider} />
        </Col>
        <Col span={3}>
          <BookTypeStatistics
            data={bookStatistics}
            loading={bookStatisticsLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Orders;
