import { Col, Row } from "antd";
import React from "react";
import styles from "./index.less";

const BookTypeStatistics = ({ data }) => {
  return (
    <>
      <Row gutter={8} className={styles.bookTypeStatistics}>
        {data.map((item) => (
          <React.Fragment key={item.type}>
            <Col span={18}>{item.type}</Col>
            <Col span={6}>{item.count}</Col>
          </React.Fragment>
        ))}
      </Row>
    </>
  );
};

export default BookTypeStatistics;
