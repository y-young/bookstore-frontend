import books from "@/assets/books";
import { Input } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";

const Books = () => {
  return (
    <>
      <PageHeader title="书籍" span={8}>
        <Input.Search placeholder="搜索书籍" />
      </PageHeader>
      <BookList books={books} />
    </>
  );
};

export default Books;
