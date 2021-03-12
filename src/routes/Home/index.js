import books from "@/assets/books";
import { Carousel, Col, Divider, Row, Typography } from "antd";
import BookCard from "components/BookCard";
import styles from "./index.less";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <>
      <Carousel autoplay style={{ marginBottom: 20 }}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <Typography.Title level={2} className="pageTitle">
        新书上架
      </Typography.Title>
      <Divider />
      <Row gutter={32} className={styles.bookGrid}>
        {books.map((book) => (
          <Col span={6} key={book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
      <Typography.Title level={2} className="pageTitle">
        热销排行
      </Typography.Title>
      <Divider />
      <Row gutter={32} className={styles.bookGrid}>
        {books.map((book) => (
          <Col span={6} key={book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
