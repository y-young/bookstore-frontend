import { Badge, Col, Image, InputNumber, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const OrderBookItem = ({ book, readOnly = false }) => {
  const { removeFromCart, changeAmount } = useCart();

  return (
    <List.Item
      actions={
        readOnly
          ? []
          : [
              <Typography.Link
                type="danger"
                onClick={() => removeFromCart(book)}
              >
                移除
              </Typography.Link>,
            ]
      }
      className={styles.orderListItem}
    >
      <List.Item.Meta
        avatar={<Image src={book.cover} width={60} height={60} />}
        title={
          <Link to={`/books/${book.id}`} className={styles.bookTitle}>
            {book.title}
          </Link>
        }
        description={book.author}
        className={styles.bookDetail}
      />
      <Col flex={1}>
        {readOnly ? (
          <>{book.amount ? book.amount : 1} 件</>
        ) : (
          <>
            <InputNumber
              min={1}
              max={book.stock}
              value={book.amount ? book.amount : 1} // FIXME
              onChange={(amount) => changeAmount(book, amount)}
              className={styles.amountInput}
            />{" "}
            件
          </>
        )}
      </Col>
      <Col flex="1 1 50px" className={styles.bookPrice}>
        {currencyFormat(book.price)}{" "}
        <span className={styles.amountBadge}>
          ×
          <Badge
            count={book.amount}
            overflowCount={Infinity}
            className={styles.amountBadge}
            // style is injected into child element, only inline styles can be used
            style={{ color: "#999", backgroundColor: "#fff" }}
          ></Badge>
        </span>
      </Col>
    </List.Item>
  );
};

export default OrderBookItem;
