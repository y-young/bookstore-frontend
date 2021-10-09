import { Col, Row, Skeleton } from "antd";
import styles from "./index.less";

const BookDescription = ({ book, loading }) => {
  return (
    <Row gutter={16} justify="space-around">
      <Col span={24}>
        {(loading || book?.description) && (
          <blockquote className={styles.description}>
            <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
              {book?.description}
            </Skeleton>
          </blockquote>
        )}
      </Col>
    </Row>
  );
};

export default BookDescription;
