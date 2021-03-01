import books from "@/assets/books";
import { Col, Row, Skeleton } from "antd";
import BookCoverCard from "components/BookCoverCard";
import BookDescription from "components/BookDescription";
import BookDetailButton from "components/BookDetailButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    setBook(books[bookId - 1]); // TODO
  }, [bookId]);

  return (
    <>
      <Row gutter={16} justify="space-around">
        <Col span={8}>
          <BookCoverCard book={book} />
        </Col>
        <Col span={14}>
          <Skeleton loading={!book} active={true}>
            <BookDescription book={book} />
            <BookDetailButton book={book} />
          </Skeleton>
        </Col>
      </Row>
    </>
  );
};

export default BookDetail;
