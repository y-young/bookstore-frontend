import books from "@/assets/books";
import { Col, Divider, Input, List, Row, Typography } from "antd";
import BookListItem from "components/BookListItem";

const Books = () => {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          书架
        </Typography.Title>
        <Col span={8}>
          <Input.Search placeholder="搜索图书" />
        </Col>
      </Row>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={books}
        renderItem={(item) => <BookListItem book={item} />}
      />
    </>
  );
};

export default Books;
