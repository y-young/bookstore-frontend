import useRequest from "@umijs/use-request";
import { Col, Divider, Row, Spin, Typography } from "antd";
import BookCard from "components/BookCard";
import styles from "./index.less";

const Home = () => {
  const { data: latestBooks, loading: latestBooksLoading } =
    useRequest("/books/latest");
  const { data: bestSales, loading: bestSalesLoading } =
    useRequest("/books/bestSales");
  return (
    <>
      <Typography.Title level={1}>你的知识，登上新高度。</Typography.Title>
      <Typography.Title level={2} className="pageTitle">
        新书上架
      </Typography.Title>
      <Divider />
      <Spin spinning={latestBooksLoading}>
        <Row gutter={32} className={styles.bookGrid}>
          {latestBooks?.map((book) => (
            <Col lg={6} md={8} sm={12} key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Spin>
      <Typography.Title level={2} className="pageTitle">
        热销排行
      </Typography.Title>
      <Divider />
      <Spin spinning={bestSalesLoading}>
        <Row gutter={32} className={styles.bookGrid}>
          {bestSales?.map((book) => (
            <Col lg={6} md={8} sm={12} key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default Home;
