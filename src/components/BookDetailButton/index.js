import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, message, Skeleton, Space } from "antd";
import { useHistory } from "react-router-dom";

const BookDetailButton = ({ book }) => {
  const history = useHistory();

  const buy = () => {
    history.push("/cart");
  };

  const addToCart = () => {
    message.success("已加入购物车");
  };

  return (
    <Space>
      {!book ? (
        <Skeleton.Button active={true} size="large" />
      ) : (
        <>
          {book.stock === 0 ? (
            <Button size="large" icon={<BellOutlined />}>
              到货通知
            </Button>
          ) : (
            <>
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
            </>
          )}
        </>
      )}
    </Space>
  );
};

export default BookDetailButton;
