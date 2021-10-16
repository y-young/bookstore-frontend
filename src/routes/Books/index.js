import useRequest from "@umijs/use-request";
import { Input, Spin } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { formatPaginatedResult, getPaginatedApiUrl } from "utils/helpers";

const Books = () => {
  const { run, data, loading, pagination } = useRequest(
    ({ current, pageSize }, query) =>
      getPaginatedApiUrl("/books", current, pageSize) + `&query=${query || ""}`,
    { formatResult: formatPaginatedResult, paginated: true }
  );

  const onSearch = (query) => {
    run({ ...pagination, current: 0 }, query);
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
