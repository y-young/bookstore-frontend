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
import { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const BookList = forwardRef(
  (
    { books, isAdmin = false, onEditBook, onDeleteBook, deleteLoading = false },
    ref
  ) => {
    const { addToCart } = useCart();
    // Book to edit
    const [currentBook, setCurrentBook] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBookIds, setSelectedBookIds] = useState([]);
    const rowSelection = {
      selectedRowKeys: selectedBookIds,
      onChange: setSelectedBookIds,
    };

    useImperativeHandle(ref, () => {
      return {
        getSelectedBookIds: () => {
          return selectedBookIds;
        },
        clearSelection: () => {
          setSelectedBookIds([]);
        },
      };
    });

    const add2Cart = (book) => {
      addToCart(book);
      message.success("已添加到购物车");
    };

    const editBook = (book, index) => {
      setCurrentBook({ ...book, index });
      setModalVisible(true);
    };

    const finishEditing = (before, after = null) => {
      if (after === null) {
        // close without confirmation
        setModalVisible(false);
        return;
      }
      onEditBook(before.index, after);
      setModalVisible(false);
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

    const renderAdminActions = (book, index) => [
      <Button
        key="edit"
        icon={<EditOutlined />}
        onClick={() => editBook(book, index)}
      >
        编辑
      </Button>,
      <Button
        danger
        key="delete"
        icon={<DeleteOutlined />}
        loading={deleteLoading}
        onClick={() => onDeleteBook(book)}
      >
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
              render: (_, book, index) =>
                isAdmin
                  ? renderAdminActions(book, index)
                  : renderUserActions(book),
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
  }
);

export default BookList;
