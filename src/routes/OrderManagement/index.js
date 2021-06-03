import useRequest from "@umijs/use-request";
import { DatePicker, Divider, Input } from "antd";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";
import { useState } from "react";
import { getApiUrlWithDateRange } from "utils/helpers";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const [bookTitle, setBookTitle] = useState("");
  const { run, data, loading } = useRequest(
    (startDate, endDate) =>
      getApiUrlWithDateRange("/orders", startDate, endDate) +
      `&bookTitle=${bookTitle}`,
    { initialData: [], refreshDeps: [bookTitle] }
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
        <Input.Search
          placeholder="搜索书籍"
          onSearch={(keyword) => setBookTitle(keyword)}
        />
        <RangePicker onChange={onDateRangeChange} />
        <Divider />
      </PageHeader>
      <OrderList orders={data} loading={loading} />
    </>
  );
};

export default OrderManagement;
