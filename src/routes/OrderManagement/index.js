import useRequest from "@umijs/use-request";
import { DatePicker, Divider, Input, Spin } from "antd";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const { data, loading } = useRequest("/orders", { initialData: [] });

  return (
    <>
      <PageHeader title="订单管理">
        <Input.Search placeholder="搜索书籍" />
        <RangePicker />
        <Divider />
      </PageHeader>
      <Spin spinning={loading}>
        <OrderList orders={data} />
      </Spin>
    </>
  );
};

export default OrderManagement;
