import useRequest from "@umijs/use-request";
import { Spin } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { useParams } from "react-router-dom";
import { formatPaginatedResult, getPaginatedApiUrl } from "utils/helpers";

const BooksByTag = () => {
  const { tag } = useParams();
  const { data, loading, pagination } = useRequest(
    ({ current, pageSize }) =>
      getPaginatedApiUrl(
        `/books/tag/${encodeURIComponent(tag)}`,
        current,
        pageSize
      ),
    { formatResult: formatPaginatedResult, paginated: true }
  );

  return (
    <>
      <PageHeader title={`“${tag}”的相关书籍`} span={8}></PageHeader>
      <Spin spinning={loading}>
        <BookList books={data?.list} pagination={pagination} />
      </Spin>
    </>
  );
};

export default BooksByTag;
