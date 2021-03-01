import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Image, List, message } from "antd";
import StockStatus from "components/StockStatus";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import useCart from "utils/useCart";
import styles from "./index.less";

const BookListItem = ({ book }) => {
  const { addToCart } = useCart();

  const add2Cart = () => {
    addToCart(book);
    message.success("已添加到购物车");
  };

  return (
    <List.Item
      actions={[
        book.stock === 0 ? (
          <Button icon={<BellOutlined />}>到货通知</Button>
        ) : (
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={add2Cart}
          >
            加入购物车
          </Button>
        ),
      ]}
    >
      <List.Item.Meta
        avatar={<Image src={book.cover} width={100} height={100} />}
        title={
          <Link to={`/books/${book.id}`} className={styles.bookTitle}>
            {book.title}
          </Link>
        }
        description={
          <span>
            {book.author}
            <br />
            ISBN: {book.isbn}
          </span>
        }
        style={{ flexGrow: 3 }}
      />
      <Col flex="1 1 70px">
        <StockStatus stock={book.stock} />
      </Col>
      <Col flex="1 1" className={styles.bookPrice}>
        {currencyFormat(book.price)}
      </Col>
    </List.Item>
  );
};

export default BookListItem;
