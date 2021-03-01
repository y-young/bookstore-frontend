import { Col, Image, InputNumber, List, Typography } from "antd";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const OrderItem = ({ book, onDelete, readOnly = false }) => {
  const { changeAmount } = useCart();

  return (
    <List.Item
      actions={
        readOnly
          ? []
          : [
              <Typography.Link type="danger" onClick={() => onDelete(book)}>
                移除
              </Typography.Link>,
            ]
      }
    >
      <List.Item.Meta
        avatar={<Image src={book.cover} width={60} height={60} />}
        title={
          <Link to={`/books/${book.id}`} className={styles.bookTitle}>
            {book.title}
          </Link>
        }
        description={book.author}
        style={{ flexGrow: 3 }}
      />
      <Col flex={1}>
        {readOnly ? (
          <>{book.amount ? book.amount : 1} 件</>
        ) : (
          <>
            <InputNumber
              min={1}
              max={book.stock}
              defaultValue={book.amount ? book.amount : 1}
              onChange={(amount) => changeAmount(book, amount)}
              style={{ width: "70px" }}
            />{" "}
            件
          </>
        )}
      </Col>
      <Col flex="1 1 50px" className={styles.bookPrice}>
        {currencyFormat(book.price)}
      </Col>
    </List.Item>
  );
};

export default OrderItem;
