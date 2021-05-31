import { currencyFormat } from "@/utils/helpers";
import useRequest from "@umijs/use-request";
import { Table } from "antd";

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

const UserStatistics = () => {
  const { data, loading } = useRequest("/users/rank");
  return (
    <Table loading={loading} columns={columns} dataSource={data} rowKey="id" />
  );
};

export default UserStatistics;
