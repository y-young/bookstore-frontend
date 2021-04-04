import books from "@/assets/books";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { createRef, useState } from "react";

const BookManagement = () => {
  const [bookList, setBookList] = useState(books);
  const [modalVisible, setModalVisible] = useState(false);
  const bookListRef = createRef();

  const addBook = () => {
    setModalVisible(true);
  };

  const onEditBook = (index, book) => {
    const newBookList = [...bookList];
    newBookList[index] = book;
    setBookList(newBookList);
  };

  const onDeleteBook = (book) => {
    setBookList(bookList.filter((item) => item.id !== book.id));
  };

  const onBatchDeleteBooks = () => {
    const bookIds = bookListRef.current.getSelectedBookIds();
    setBookList(bookList.filter((item) => !bookIds.includes(item.id)));
    bookListRef.current.clearSelection();
  };

  const onAddBook = (_, newBook) => {
    if (newBook) {
      setBookList((bookList) => [...bookList, newBook]);
    }
    setModalVisible(false);
  };

  return (
    <>
      <PageHeader title="书籍管理" span={12}>
        <Input.Search placeholder="搜索图书" />
        <Button type="primary" icon={<PlusOutlined />} onClick={addBook}>
          添加
        </Button>
        <Button danger icon={<DeleteOutlined />} onClick={onBatchDeleteBooks}>
          删除
        </Button>
      </PageHeader>
      <BookList
        books={bookList}
        isAdmin={true}
        onEditBook={onEditBook}
        onDeleteBook={onDeleteBook}
        ref={bookListRef}
      />
      <BookEditModal isVisible={modalVisible} closeCallback={onAddBook} />
    </>
  );
};

export default BookManagement;
