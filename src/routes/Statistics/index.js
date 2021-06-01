import BookStatistics from "@/components/BookStatistics";
import UserStatistics from "@/components/UserStatistics";
import { Col, DatePicker, Row, Statistic } from "antd";
import PageHeader from "components/PageHeader";
import { useState } from "react";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Statistics = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onDateRangeChange = (_, dateStrings) => {
    const [start, end] = dateStrings;
    if (!start || !end) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <PageHeader
        title={
          <Switch>
            <Route path="/statistics/books">书籍销量榜</Route>
            <Route path="/statistics/users">用户消费榜</Route>
          </Switch>
        }
      >
        <RangePicker onChange={onDateRangeChange} />
      </PageHeader>
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic title="订单数量" value={2897} />
        </Col>
        <Col span={8}>
          <Statistic title="书籍销量" value={11278} />
        </Col>
        <Col span={8}>
          <Statistic
            title="销售总金额"
            prefix={"￥"}
            value={11271688}
            precision={2}
          />
        </Col>
      </Row>
      <Switch>
        <Route path="/statistics/books">
          <BookStatistics startDate={startDate} endDate={endDate} />
        </Route>
        <Route path="/statistics/users">
          <UserStatistics />
        </Route>
      </Switch>
    </>
  );
};

export default Statistics;
