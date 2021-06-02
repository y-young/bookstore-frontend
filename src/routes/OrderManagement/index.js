import useRequest from "@umijs/use-request";
import { DatePicker, Divider, Input, Spin } from "antd";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";
import { getApiUrlWithDateRange } from "utils/helpers";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const { run, data, loading } = useRequest(
    (startDate, endDate) =>
      getApiUrlWithDateRange("/orders/", startDate, endDate),
    { initialData: [] }
  );

  const onDateRangeChange = async (_, dateStrings) => {
    const [start, end] = dateStrings;
    if (!start || !end) {
      await run();
      return;
    }
    await run(start, end);
  };

  return (
    <>
      <PageHeader title="订单管理">
        <Input.Search placeholder="搜索书籍" />
        <RangePicker onChange={onDateRangeChange} />
        <Divider />
      </PageHeader>
      <Spin spinning={loading}>
        <OrderList orders={data} />
      </Spin>
    </>
  );
};

export default OrderManagement;
