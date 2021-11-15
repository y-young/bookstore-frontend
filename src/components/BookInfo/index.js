import { Tag, Typography } from "antd";
import StockStatus from "components/StockStatus";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const BookInfo = ({ book = {} }) => {
  const { title, author, isbn, stock, price, deleted } = book;

  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      <div className={styles.bookMeta}>
        <p className={styles.bookAuthor}>{author}</p>
        <p>
          {book?.type && <Tag color="blue">{book.type}</Tag>}
          {book?.tags &&
            book.tags.map((tag) => (
              <Link to={`/books/tag/${tag}`} key={tag}>
                <Tag color="green">{tag}</Tag>
              </Link>
            ))}
        </p>
        <p>ISBN：{isbn}</p>
        <p>
          状态：
          <StockStatus stock={stock} deleted={deleted} />
        </p>
      </div>
      <Typography.Title level={3} className={styles.bookPrice}>
        {currencyFormat(price)}
      </Typography.Title>
    </>
  );
};

export default BookInfo;
