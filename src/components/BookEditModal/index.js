import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, message, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";

const layout = {
  labelCol: { span: 6 },
};

const BookEditModal = ({ book, isVisible, closeCallback }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [coverUrl, setCoverUrl] = useState();

  useEffect(() => {
    form.resetFields();
    if (book) {
      setCoverUrl(book.cover);
    }
  }, [book, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values); // TODO: submit
        message.success("提交成功");
        form.resetFields();
        closeCallback();
      })
      .catch((info) => {});
  };

  const handleCancel = () => {
    form.resetFields();
    closeCallback();
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>上传封面</div>
    </div>
  );

  return (
    <Modal
      title="编辑书籍"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender={true}
      okText="保存"
    >
      <Form form={form} name="editBook" initialValues={book ? book : {}}>
        <Form.Item
          name="title"
          label="书名"
          rules={[{ required: true }]}
          {...layout}
        >
          <Input placeholder="书名" />
        </Form.Item>
        <Form.Item
          name="author"
          label="作者"
          rules={[{ required: true }]}
          {...layout}
        >
          <Input placeholder="作者" />
        </Form.Item>
        <Form.Item
          name="isbn"
          label="ISBN"
          rules={[{ required: true }]}
          {...layout}
        >
          <Input placeholder="ISBN" />
        </Form.Item>
        <Form.Item
          name="price"
          label="定价"
          rules={[{ required: true }]}
          {...layout}
        >
          <InputNumber
            placeholder="定价"
            precision={2}
            min={0}
            className={styles.inputNumber}
          />
        </Form.Item>
        <Form.Item
          name="stock"
          label="库存"
          rules={[{ required: true }]}
          {...layout}
        >
          <InputNumber
            placeholder="库存"
            precision={0}
            min={0}
            className={styles.inputNumber}
          />
        </Form.Item>
        <Form.Item
          name="cover"
          label="封面"
          rules={[{ required: true }]}
          {...layout}
        >
          <Upload name="avatar" listType="picture-card">
            {coverUrl ? (
              <img src={coverUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookEditModal;
