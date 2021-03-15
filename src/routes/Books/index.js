import books from "@/assets/books";
import { Input } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";

const Books = () => {
  return (
    <>
      <PageHeader title="书架" span={8}>
        <Input.Search placeholder="搜索图书" />
      </PageHeader>
      <BookList books={books} />
    </>
  );
};

export default Books;
