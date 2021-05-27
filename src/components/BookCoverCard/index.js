import { Card, Image } from "antd";
import styles from "./index.less";
import { getCoverUrl} from "utils/helpers";

const BookCoverCard = ({ book }) => {
  return (
    <Card bordered={false} className={styles.coverCard}>
      {!book ? (
        <div className={styles.placeholder} />
      ) : (
        <Image src={getCoverUrl(book?.cover)} alt={book.title} />
      )}
    </Card>
  );
};

export default BookCoverCard;
