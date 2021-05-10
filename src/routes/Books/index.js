import useRequest from "@umijs/use-request";
import { Input, Spin } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";

const Books = () => {
  const { data, loading } = useRequest("/books", {
    initialData: [],
  });

  return (
    <>
      <PageHeader title="书籍" span={8}>
        <Input.Search placeholder="搜索书籍" />
      </PageHeader>
      <Spin spinning={loading}>
        <BookList books={data} />
      </Spin>
    </>
  );
};

export default Books;
