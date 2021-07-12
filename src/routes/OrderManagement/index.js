import useRequest from "@umijs/use-request";
import { DatePicker, Divider, Input } from "antd";
import OrderList from "components/OrderList";
import PageHeader from "components/PageHeader";
import { useState } from "react";
import {
  formatPaginatedResult,
  getApiUrlWithDateRange,
  getPaginatedApiUrl,
} from "utils/helpers";

const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const [bookTitle, setBookTitle] = useState("");
  const { pagination, run, data, loading } = useRequest(
    ({ current, pageSize }, startDate, endDate) =>
      getApiUrlWithDateRange(
        getPaginatedApiUrl("/orders", current, pageSize),
        startDate,
        endDate
      ) + `&bookTitle=${bookTitle}`,
    {
      initialData: [],
      refreshDeps: [bookTitle],
      formatResult: formatPaginatedResult,
      paginated: true,
    }
  );

  const onDateRangeChange = async (_, dateStrings) => {
    const [start, end] = dateStrings;
    if (!start || !end) {
      await run(pagination);
      return;
    }
    await run(pagination, start, end);
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
      <OrderList
        orders={data?.list}
        loading={loading}
        pagination={pagination}
      />
    </>
  );
};

export default OrderManagement;
