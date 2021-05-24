import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Form, Input, InputNumber, message, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.less";

const BookEditModal = ({ book, isVisible, closeCallback }) => {
  const [form] = Form.useForm();
  const [uploadLoading] = useState();
  const [coverUrl, setCoverUrl] = useState();
  const { run: addBook, loading: addLoading } = useRequest(
    (data) => ({
      method: "post",
      url: "/books",
      data: { ...data, price: data.price * 100 },
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("提交成功");
      },
    }
  );
  const { run: editBook, loading: editLoading } = useRequest(
    (bookId, data) => ({
      method: "put",
      url: `/books/${bookId}`,
      data: { ...data, price: data.price * 100 },
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("提交成功");
      },
    }
  );

  useEffect(() => {
    form.resetFields();
    if (book) {
      setCoverUrl(book.cover);
    }
  }, [book, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        if (book && book.id) {
          await editBook(book.id, values);
        } else {
          await addBook(values);
        }
        form.resetFields();
        closeCallback(book, values);
      })
      .catch((info) => {});
  };

  const handleCancel = () => {
    form.resetFields();
    closeCallback(book);
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
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
      confirmLoading={addLoading || editLoading}
    >
      <Form
        form={form}
        name="editBook"
        initialValues={book ? { ...book, price: book.price / 100 } : {}}
        labelCol={{ span: 6 }}
      >
        <Form.Item name="title" label="书名" rules={[{ required: true }]}>
          <Input placeholder="书名" />
        </Form.Item>
        <Form.Item name="author" label="作者">
          <Input placeholder="作者" />
        </Form.Item>
        <Form.Item name="isbn" label="ISBN">
          <Input placeholder="ISBN" />
        </Form.Item>
        <Form.Item name="price" label="定价" rules={[{ required: true }]}>
          <InputNumber
            placeholder="定价"
            precision={2}
            min={0}
            className={styles.inputNumber}
          />
        </Form.Item>
        <Form.Item name="stock" label="库存" rules={[{ required: true }]}>
          <InputNumber
            placeholder="库存"
            precision={0}
            min={0}
            className={styles.inputNumber}
          />
        </Form.Item>
        <Form.Item name="cover" label="封面">
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
