import { Card } from "antd";
import { useHistory } from "react-router-dom";

const BookCard = (props) => {
  const history = useHistory();
  const { title, author, cover } = props.book;

  return (
    <Card
      hoverable
      cover={<img alt={title} src={cover} style={{ borderRadius: "10px" }} />}
      onClick={() => history.push("/book")}
    >
      <Card.Meta title={title} description={author} />
    </Card>
  );
};

export default BookCard;
