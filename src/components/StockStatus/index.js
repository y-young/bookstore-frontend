import { Badge } from "antd";

const StockStatus = ({ stock }) => {
  return (
    <>
      {stock > 0 ? (
        <>
          <Badge color="green" />
          有货，库存 {stock} 件
        </>
      ) : (
        <>
          <Badge color="red" />
          暂时无货
        </>
      )}
    </>
  );
};

export default StockStatus;
