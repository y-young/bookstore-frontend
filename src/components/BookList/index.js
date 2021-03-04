import {
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ProList from "@ant-design/pro-list";
import { Button, Col, Image, message, Row } from "antd";
import StockStatus from "components/StockStatus";
import { useState } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const BookList = ({ books }) => {
  const { addToCart } = useCart();
  const isAdmin = false; //TODO: use auth
  const [selectedBooks, setSelectedBooks] = useState([]);
  const rowSelection = {
    selectedBooks,
    onChange: (books) => setSelectedBooks(books),
  };

  const add2Cart = (book) => {
    addToCart(book);
    message.success("已添加到购物车");
  };

  const renderUserActions = (book) => [
    book.stock === 0 ? (
      <Button icon={<BellOutlined />}>到货通知</Button>
    ) : (
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => add2Cart(book)}
      >
        加入购物车
      </Button>
    ),
  ];

  const renderAdminActions = (book) => [
    <Button icon={<EditOutlined />}>编辑</Button>,
    <Button danger icon={<DeleteOutlined />}>
      删除
    </Button>,
  ];

  return (
    <>
      <ProList
        dataSource={books}
        rowKey="id"
        className={
          isAdmin ? [styles.bookList, styles.withOption] : styles.bookList
        }
        rowSelection={isAdmin ? rowSelection : false}
        metas={{
          title: {
            render: (_, book) => (
              <Link to={`/books/${book.id}`} className={styles.bookTitle}>
                {book.title}
              </Link>
            ),
          },
          description: {
            render: (_, book) => (
              <>
                <span className={styles.bookAuthor}>{book.author}</span>
                <br />
                ISBN: {book.isbn}
              </>
            ),
          },
          avatar: {
            render: (_, book) => (
              <Image src={book.cover} width={100} height={100} />
            ),
          },
          content: {
            render: (_, book) => (
              <Row>
                <Col flex="2 1">
                  <StockStatus stock={book.stock} />
                </Col>
                <Col flex="1 1" className={styles.bookPrice}>
                  {currencyFormat(book.price)}
                </Col>
              </Row>
            ),
          },
          actions: {
            render: (_, book) =>
              isAdmin ? renderAdminActions(book) : renderUserActions(book),
          },
        }}
      />
    </>
  );
};

export default BookList;
