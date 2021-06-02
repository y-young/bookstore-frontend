import useRequest from "@umijs/use-request";
import { Input, Spin } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { formatPaginatedResult, getPaginatedApiUrl } from "utils/helpers";

const Books = () => {
  const { run, data, loading, pagination } = useRequest(
    ({ current, pageSize }, keyword) =>
      getPaginatedApiUrl("/books", current, pageSize) +
      `&keyword=${keyword || ""}`,
    { formatResult: formatPaginatedResult, paginated: true }
  );

  const onSearch = (keyword) => {
    run(pagination, keyword);
  };

  return (
    <>
      <PageHeader title="书籍" span={8}>
        <Input.Search placeholder="搜索书籍" onSearch={onSearch} />
      </PageHeader>
      <Spin spinning={loading}>
        <BookList books={data?.list} pagination={pagination} />
      </Spin>
    </>
  );
};

export default Books;
