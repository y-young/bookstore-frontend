import useRequest from "@umijs/use-request";
import { Col, Row, Skeleton } from "antd";
import BookCoverCard from "components/BookCoverCard";
import BookDetailButton from "components/BookDetailButton";
import BookInfo from "components/BookInfo";
import { useParams } from "react-router-dom";
import BookDescription from "../../components/BookDescription";

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
            <BookInfo book={data} />
            <BookDetailButton book={data} />
          </Skeleton>
        </Col>
      </Row>
      <BookDescription book={data} loading={loading} />
    </>
  );
};

export default BookDetail;
