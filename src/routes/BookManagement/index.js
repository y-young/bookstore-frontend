import books from "@/assets/books";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { useState } from "react";

const BookManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const addBook = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <PageHeader title="书籍管理" span={12}>
        <Input.Search placeholder="搜索图书" />
        <Button type="primary" icon={<PlusOutlined />} onClick={addBook}>
          添加
        </Button>
        <Button danger icon={<DeleteOutlined />}>
          删除
        </Button>
      </PageHeader>
      <BookList books={books} isAdmin={true} />
      <BookEditModal isVisible={modalVisible} closeCallback={closeModal} />
    </>
  );
};

export default BookManagement;
