import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, Input, message } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { createRef, useState } from "react";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const bookListRef = createRef();
  const { data, loading, refresh } = useRequest("/books", {
    onSuccess: (books) => setBooks(books),
  });
  const { run: onDeleteBook, loading: deleteLoading } = useRequest(
    (book) => ({
      method: "delete",
      url: `/books/${book.id}`,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
        refresh();
      },
    }
  );

  const addBook = () => {
    setModalVisible(true);
  };

  const onEditBook = (index, book) => {
    refresh();
  };

  const onBatchDeleteBooks = () => {
    const bookIds = bookListRef.current.getSelectedBookIds();
    // TODO: submit
    refresh();
    bookListRef.current.clearSelection();
  };

  const onAddBook = (_, newBook) => {
    if (newBook) {
      refresh();
    }
    setModalVisible(false);
  };

  const onSearch = (keyword) => {
    if (!keyword) {
      setBooks(data);
    }
    setBooks(
      data.filter(
        (book) => book.title.includes(keyword) || book.author.includes(keyword)
      )
    );
  };

  return (
    <>
      <PageHeader title="书籍管理" span={12}>
        <Input.Search placeholder="搜索图书" onSearch={onSearch} />
        <Button type="primary" icon={<PlusOutlined />} onClick={addBook}>
          添加
        </Button>
        <Button danger icon={<DeleteOutlined />} onClick={onBatchDeleteBooks}>
          删除
        </Button>
      </PageHeader>
      <BookList
        books={books}
        isAdmin={true}
        loading={loading}
        onEditBook={onEditBook}
        onDeleteBook={onDeleteBook}
        deleteLoading={deleteLoading}
        ref={bookListRef}
      />
      <BookEditModal isVisible={modalVisible} closeCallback={onAddBook} />
    </>
  );
};

export default BookManagement;
