import { currencyFormat } from "@/utils/helpers";
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
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "订单数",
    dataIndex: "orders",
    key: "orders",
  },
  {
    title: "购书数",
    dataIndex: "books",
    key: "books",
  },
  {
    title: "消费金额",
    key: "amount",
    dataIndex: "amount",
    render: (text) => currencyFormat(text),
  },
];

const data = [
  {
    id: 1,
    username: "Jim Green",
    orders: 42,
    books: 879,
    amount: 3979829,
  },
  {
    id: 2,
    username: "John Brown",
    orders: 32,
    books: 108,
    amount: 43323.89,
  },
  {
    id: 3,
    username: "Joe Black",
    orders: 2,
    books: 5,
    amount: 323.1,
  },
];

const UserStatistics = () => {
  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default UserStatistics;
