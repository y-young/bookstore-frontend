import books from "@/assets/books";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
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
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          书籍管理
        </Typography.Title>
        <Col span={12} style={{ textAlign: "end" }}>
          <Space>
            <Input.Search placeholder="搜索图书" />
            <Button type="primary" icon={<PlusOutlined />} onClick={addBook}>
              添加
            </Button>
            <Button danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <BookList books={books} isAdmin={true} />
      <BookEditModal isVisible={modalVisible} closeCallback={closeModal} />
    </>
  );
};

export default BookManagement;
