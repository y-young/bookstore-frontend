import {
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ProList from "@ant-design/pro-list";
import { Button, Col, Image, message, Row } from "antd";
import BookEditModal from "components/BookEditModal";
import StockStatus from "components/StockStatus";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const BookList = ({ books, isAdmin = false }) => {
  const { addToCart } = useCart();
  const [bookList, setBookList] = useState([]);
  // Book to edit
  const [currentBook, setCurrentBook] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const rowSelection = {
    selectedBooks,
    onChange: (books) => setSelectedBooks(books),
  };

  useEffect(() => {
    setBookList(books);
  }, [books]);

  const add2Cart = (book) => {
    addToCart(book);
    message.success("已添加到购物车");
  };

  const editBook = (book) => {
    setCurrentBook(book);
    setModalVisible(true);
  };

  const finishEditing = () => {
    // TODO: reload list
    setModalVisible(false);
  };

  const deleteBook = (book) => {
    setBookList(bookList.filter((item) => item.id !== book.id));
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
    <Button key="edit" icon={<EditOutlined />} onClick={() => editBook(book)}>
      编辑
    </Button>,
    <Button
      danger
      key="delete"
      icon={<DeleteOutlined />}
      onClick={() => deleteBook(book)}
    >
      删除
    </Button>,
  ];

  return (
    <>
      <ProList
        dataSource={bookList}
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
      {isAdmin && (
        <BookEditModal
          isVisible={modalVisible}
          book={currentBook}
          closeCallback={finishEditing}
        />
      )}
    </>
  );
};

export default BookList;
