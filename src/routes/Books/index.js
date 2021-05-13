import useRequest from "@umijs/use-request";
import { Input, Spin } from "antd";
import BookList from "components/BookList";
import PageHeader from "components/PageHeader";
import { useState } from "react";

const Books = () => {
  const { data, loading } = useRequest("/books", {
    onSuccess: (books) => setBooks(books),
  });
  const [books, setBooks] = useState([]);

  const onSearch = (keyword) => {
    if (!keyword) {
      setBooks(data);
    }
    setBooks(
      data.filter(
        (book) => book.title.includes(keyword) || book.author.includes(keyword)
      )
    );
  };

  return (
    <>
      <PageHeader title="书籍" span={8}>
        <Input.Search placeholder="搜索书籍" onSearch={onSearch} />
      </PageHeader>
      <Spin spinning={loading}>
        <BookList books={books} />
      </Spin>
    </>
  );
};

export default Books;
