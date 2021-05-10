import useRequest from "@umijs/use-request";
import { Col, Row, Skeleton } from "antd";
import BookCoverCard from "components/BookCoverCard";
import BookDescription from "components/BookDescription";
import BookDetailButton from "components/BookDetailButton";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { bookId } = useParams();
  const { data, loading } = useRequest(`/books/${bookId}`);

  return (
    <>
      <Row gutter={16} justify="space-around">
        <Col span={8}>
          <BookCoverCard book={data} />
        </Col>
        <Col span={14}>
          <Skeleton loading={loading} active={true}>
            <BookDescription book={data} />
            <BookDetailButton book={data} />
          </Skeleton>
        </Col>
      </Row>
    </>
  );
};

export default BookDetail;
