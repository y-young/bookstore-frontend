import books from "@/assets/books";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd";
import BookEditModal from "components/BookEditModal";
import BookList from "components/BookList";
import { useState } from "react";

const Books = () => {
  const isAdmin = true; // TODO: useAuth
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
          书架
        </Typography.Title>
        <Col span={isAdmin ? 12 : 8} style={{ textAlign: "end" }}>
          <Space>
            <Input.Search placeholder="搜索图书" />
            {isAdmin && (
              <>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={addBook}
                >
                  添加
                </Button>
                <Button danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </>
            )}
          </Space>
        </Col>
      </Row>
      <Divider />
      <BookList books={books} />
      {isAdmin && (
        <BookEditModal isVisible={modalVisible} closeCallback={closeModal} />
      )}
    </>
  );
};

export default Books;
