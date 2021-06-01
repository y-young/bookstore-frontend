import useRequest from "@umijs/use-request";
import { Table } from "antd";
import { useEffect } from "react";
import { currencyFormat, getApiUrlWithDateRange } from "utils/helpers";

const columns = [
  {
    title: "#",
    key: "index",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "ID",
    dataIndex: ["user", "id"],
    key: "id",
  },
  {
    title: "用户名",
    dataIndex: ["user", "username"],
    key: "username",
  },
  {
    title: "订单数",
    dataIndex: "orderCount",
    key: "orderCount",
  },
  {
    title: "购书数",
    dataIndex: "bookCount",
    key: "bookCount",
  },
  {
    title: "消费金额",
    key: "total",
    dataIndex: "total",
    render: (text) => currencyFormat(text),
  },
];

const UserStatistics = ({ startDate, endDate }) => {
  const { run, data, loading } = useRequest((url) => url, { manual: true });

  useEffect(() => {
    run(getApiUrlWithDateRange("/users/rank", startDate, endDate));
  }, [startDate, endDate, run]);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.user.id}
    />
  );
};

export default UserStatistics;
