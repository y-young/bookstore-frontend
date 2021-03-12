import BookStatistics from "@/components/BookStatistics";
import UserStatistics from "@/components/UserStatistics";
import {
  Col,
  DatePicker,
  Divider,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const Statistics = () => {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          <Switch>
            <Route path="/statistics/books">书籍销量榜</Route>
            <Route path="/statistics/users">用户消费榜</Route>
          </Switch>
        </Typography.Title>
        <Col>
          <Space>
            <RangePicker />
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16} className={styles.statistics}>
        <Col span={8}>
          <Statistic title="订单数量" value={2897} />
        </Col>
        <Col span={8}>
          <Statistic title="书籍销量" value={11278} />
        </Col>
        <Col span={8}>
          <Statistic title="销售总金额" value={11271688} precision={2} />
        </Col>
      </Row>
      <Switch>
        <Route path="/statistics/books">
          <BookStatistics />
        </Route>
        <Route path="/statistics/users">
          <UserStatistics />
        </Route>
      </Switch>
    </>
  );
};

export default Statistics;
