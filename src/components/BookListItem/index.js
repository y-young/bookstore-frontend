import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Image, List } from "antd";
import StockStatus from "components/StockStatus";
import { Link } from "react-router-dom";
import { currencyFormat } from "utils/helpers";
import styles from "./index.less";

const BookListItem = ({ book }) => {
  return (
    <List.Item
      actions={[
        <Button type="primary" icon={<ShoppingCartOutlined />}>
          加入购物车
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Image src={book.cover} width={100} height={100} />}
        title={
          <Link to={`/books/${book.id}`} className={styles.bookTitle}>
            {book.title}
          </Link>
        }
        description={book.author}
        style={{ flexGrow: 3 }}
      />
      <Col flex="1 1 80px">ISBN: {book.isbn}</Col>
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
