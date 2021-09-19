import { Button, Result } from "antd";
import PageHeader from "components/PageHeader";
import { useHistory } from "react-router-dom";

const OrderSubmitted = () => {
  const history = useHistory();

  return (
    <>
      <PageHeader title="购物车" />
      <Result
        status="success"
        title="订单提交成功"
        subTitle="您的订单已接收，正在处理，请耐心等待。"
        extra={[
          <Button
            type="primary"
            key="orders"
            onClick={() => history.push("/orders")}
          >
            查看订单
          </Button>,
          <Button key="home" onClick={() => history.push("/")}>
            继续购物
          </Button>,
        ]}
      />
    </>
  );
};

export default OrderSubmitted;
