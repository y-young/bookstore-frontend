import { Card } from "antd";
import { useHistory } from "react-router-dom";

const BookCard = ({ book }) => {
  const history = useHistory();

  return (
    <Card
      hoverable
      cover={
        <img
          alt={book.title}
          src={book.cover}
          style={{ borderRadius: "10px" }}
        />
      }
      onClick={() => history.push(`/books/${book.id}`)}
    >
      <Card.Meta title={book.title} description={book.author} />
    </Card>
  );
};

export default BookCard;
