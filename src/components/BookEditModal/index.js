import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Form, Input, InputNumber, message, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { getCoverUrl, imageBasePath } from "utils/helpers";
import useAuth from "utils/useAuth";
import styles from "./index.less";

const { TextArea } = Input;

const BookEditModal = ({ book, isVisible, closeCallback }) => {
  const auth = useAuth();
  const [form] = Form.useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [coverFile, setCoverFile] = useState([]);
  const { run: addBook, loading: addLoading } = useRequest(
    (data) => ({
      method: "post",
      url: "/books",
      data,
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
      data,
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
    setCoverFile([]);
    if (book) {
      setCoverFile([{ name: book.cover, thumbUrl: getCoverUrl(book.cover) }]);
    }
  }, [book, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const data = {
          ...values,
          price: values.price * 100,
          cover: coverFile[0].name,
        };
        if (book && book.id) {
          await editBook(book.id, data);
        } else {
          await addBook(data);
        }
        form.resetFields();
        closeCallback(book, data);
      })
      .catch((info) => {});
  };

  const handleCancel = () => {
    form.resetFields();
    closeCallback(book);
  };

  const beforeUpload = (file) => {
    const isTypeValid =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isTypeValid) {
      message.error("请上传JPG, PNG或WebP类型的图片");
    }
    const isSizeTooBig = file.size / 1024 / 1024 > 5;
    if (isSizeTooBig) {
      message.error("请上传小于5MB的图片");
    }
    return isTypeValid && !isSizeTooBig;
  };

  const handleUpload = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const { id } = response.data;
      setCoverFile([{ name: id, thumbUrl: getCoverUrl(id) }]);
      setUploadLoading(false);
    }
  };

  const getValueFromEvent = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
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
        name={book ? "editBook" : "addBook"}
        initialValues={
          book
            ? {
                ...book,
                price: book.price / 100,
                cover: book.cover
                  ? [{ name: book.cover, thumbUrl: getCoverUrl(book.cover) }]
                  : [],
              }
            : {}
        }
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
        <Form.Item name="type" label="分类">
          <Input placeholder="分类" />
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Select mode="tags" placeholder="标签" open={false} />
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
        <Form.Item
          name="cover"
          label="封面"
          rules={[{ required: true, message: "请上传封面" }]}
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload
            name="file"
            listType="picture-card"
            action={imageBasePath}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            maxCount={1}
            showUploadList={false}
            headers={{ Authorization: auth.token }}
            accept="image/jpeg,image/png,image/webp"
          >
            {coverFile.length > 0 ? (
              <img
                src={coverFile[0].thumbUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="description" label="简介">
          <TextArea placeholder="简介" showCount autoSize />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookEditModal;
