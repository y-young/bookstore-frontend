import { BellOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, message, Skeleton, Space } from "antd";
import { useHistory } from "react-router-dom";
import useCart from "utils/useCart";

const BookDetailButton = ({ book }) => {
  const history = useHistory();
  const { addToCart } = useCart();
  const { run: buy, loading } = useRequest(
    { method: "post", url: "/orders", data: [{ book, amount: 1 }] },
    {
      manual: true,
      onSuccess: (data) => {
        history.push(`/orders/${data.id}`);
      },
    }
  );

  const add2Cart = () => {
    addToCart(book);
    message.success("已加入购物车");
  };

  return (
    <Space>
      {!book ? (
        <Skeleton.Button active={true} size="large" />
      ) : (
        <>
          {book.deleted ? (
            <Button size="large" disabled>
              已下架
            </Button>
          ) : book.stock === 0 ? (
            <Button size="large" icon={<BellOutlined />}>
              到货通知
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                size="large"
                onClick={buy}
                loading={loading}
              >
                立即购买
              </Button>
              <Button
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={add2Cart}
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
