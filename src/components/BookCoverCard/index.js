import { Card, Image } from "antd";
import styles from "./index.less";

const BookCoverCard = ({ book }) => {
  return (
    <Card bordered={false} className={styles.coverCard}>
      {!book ? (
        <div className={styles.placeholder} />
      ) : (
        <Image src={book?.cover} alt={book.title} />
      )}
    </Card>
  );
};

export default BookCoverCard;
