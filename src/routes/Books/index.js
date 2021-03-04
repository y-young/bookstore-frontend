import books from "@/assets/books";
import { Col, Divider, Input, Row, Typography } from "antd";
import BookList from "components/BookList";

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
      <BookList books={books} />
    </>
  );
};

export default Books;
