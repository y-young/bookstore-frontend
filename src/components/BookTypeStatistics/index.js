import { Col, Row, Skeleton } from "antd";
import React from "react";
import styles from "./index.less";

const BookTypeStatistics = ({ data, loading }) => {
  return (
    <Skeleton loading={loading} active>
      <Row gutter={8} className={styles.bookTypeStatistics}>
        {data?.map((item) => (
          <React.Fragment key={item.type}>
            <Col span={18}>{item.type}</Col>
            <Col span={6}>{item.count}</Col>
          </React.Fragment>
        ))}
      </Row>
    </Skeleton>
  );
};

export default BookTypeStatistics;
