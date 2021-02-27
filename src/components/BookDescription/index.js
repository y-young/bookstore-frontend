import { Badge, Typography } from "antd";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const BookDescription = ({ book }) => {
  const { title, author, isbn, stock, price } = book;

  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      <div className={styles.bookMeta}>
        <p>{author}</p>
        <p>ISBN：{isbn}</p>
        <p>
          状态：
          {stock > 0 ? (
            <>
              <Badge color="green" />
              有货，库存 {stock} 件
            </>
          ) : (
            <>
              <Badge color="red" />
              暂时无货
            </>
          )}
        </p>
      </div>
      <Typography.Title level={3} className={styles.bookPrice}>
        {currencyFormat(price)}
      </Typography.Title>
    </>
  );
};

export default BookDescription;
