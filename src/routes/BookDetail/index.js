import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, message, Row, Space } from "antd";
import BookDescription from "components/BookDescription";
import { useHistory } from "react-router-dom";
import styles from "./index.less";

const data = {
  title: "深入理解计算机系统",
  author: "兰德尔·E·布莱恩特",
  isbn: "9787111544937",
  stock: 0,
  price: 136.9,
};

const BookDetail = () => {
  const history = useHistory();

  const buy = () => {
    history.push("/cart");
  };

  const addToCart = () => {
    message.success("已加入购物车");
  };

  return (
    <>
      <Row gutter={16} justify="space-around">
        <Col span={8}>
          <Card bordered={false} className={styles.coverCard}>
            <Image src="http://img3m7.ddimg.cn/48/0/24106647-1_w_6.jpg" />
          </Card>
        </Col>
        <Col span={14}>
          <BookDescription book={data} />
          <Space>
            <Button type="primary" size="large" onClick={buy}>
              立即购买
            </Button>
            <Button
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={addToCart}
            >
              加入购物车
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default BookDetail;
