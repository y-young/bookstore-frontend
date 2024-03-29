import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, Input, message } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { createRef, useState } from "react";
import { formatPaginatedResult, getPaginatedApiUrl } from "utils/helpers";

const BookManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bookListRef = createRef();
  const { run, data, loading, pagination, refresh } = useRequest(
    ({ current, pageSize }, query) =>
      getPaginatedApiUrl("/books", current, pageSize) + `&query=${query || ""}`,
    { formatResult: formatPaginatedResult, paginated: true }
  );
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
  const { run: batchDeleteBook, loading: batchDeleteLoading } = useRequest(
    (data) => ({
      method: "post",
      url: "/books/delete",
      data,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
        refresh();
      },
    }
  );

  const onSearch = (query) => {
    run(pagination, query);
  };

  const addBook = () => {
    setModalVisible(true);
  };

  const onEditBook = (index, book) => {
    refresh();
  };

  const onBatchDeleteBooks = async () => {
    const bookIds = bookListRef.current.getSelectedBookIds();
    if (!bookIds || bookIds.length === 0) {
      return;
    }
    const clear = bookListRef.current.clearSelection;
    const close = message.loading("正在提交...");
    await batchDeleteBook(bookIds);
    close();
    clear();
  };

  const onAddBook = (_, newBook) => {
    if (newBook) {
      refresh();
    }
    setModalVisible(false);
  };

  return (
    <>
      <PageHeader title="书籍管理" span={12}>
        <Input.Search placeholder="搜索图书" onSearch={onSearch} />
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={addBook}
        >
          添加
        </Button>
        <Button
          key="delete"
          danger
          icon={<DeleteOutlined />}
          loading={batchDeleteLoading}
          onClick={onBatchDeleteBooks}
        >
          删除
        </Button>
      </PageHeader>
      <BookList
        books={data?.list}
        pagination={pagination}
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
