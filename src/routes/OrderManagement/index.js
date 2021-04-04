import books from "@/assets/books";
import { DatePicker, Divider, Input } from "antd";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const items = books;

  return (
    <>
      <PageHeader title="订单管理">
        <Input.Search placeholder="搜索书籍" />
        <RangePicker />
        <Divider />
      </PageHeader>
      <OrderList books={items} />
    </>
  );
};

export default OrderManagement;
