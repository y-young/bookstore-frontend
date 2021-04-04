import { Col, Row } from "antd";
import styles from "./index.less";

const BookTypeStatistics = () => {
  return (
    <>
      <Row gutter={8} className={styles.bookTypeStatistics}>
        <Col span={18}>外国文学</Col>
        <Col span={6}>10</Col>
        <Col span={18}>科幻小说</Col>
        <Col span={6}>23</Col>
        <Col span={18}>计算机</Col>
        <Col span={6}>3</Col>
      </Row>
    </>
  );
};

export default BookTypeStatistics;
