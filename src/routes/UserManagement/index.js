import {
  Badge,
  Button,
  Col,
  Divider,
  Input,
  message,
  Row,
  Table,
  Typography,
} from "antd";

const data = [
  {
    id: 1,
    username: "JimGreen",
    email: "jim@sjtu.edu.cn",
    books: 879,
    amount: 3979829,
    disabled: false,
  },
  {
    id: 2,
    username: "JohnBrown",
    email: "john@gmail.com",
    books: 108,
    amount: 43323.89,
    disabled: false,
  },
  {
    id: 3,
    username: "JoeBlack",
    email: "joe@outlook.com",
    disabled: true,
  },
];

const UserManagement = () => {
  const switchDisabled = (user) => {
    user.disabled = !user.disabled;
    message.success("操作成功");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "电子邮件地址",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "状态",
      key: "stauts",
      filters: [
        {
          text: "正常",
          value: false,
        },
        {
          text: "禁用",
          value: true,
        },
      ],
      onFilter: (value, record) => record.disabled === value,
      render: (_, record) =>
        record.disabled ? (
          <>
            <Badge color="red" />
            禁用
          </>
        ) : (
          <>
            <Badge color="green" />
            正常
          </>
        ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          danger
          onClick={() => switchDisabled(record)}
          style={{ padding: 0 }}
        >
          {record.disabled ? "解禁" : "禁用"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle">
        <Typography.Title level={2} className="pageTitle">
          用户管理
        </Typography.Title>
        <Col span={8}>
          <Input.Search placeholder="搜索用户名或电子邮件地址" />
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={data} rowKey="id" />;
    </>
  );
};

export default UserManagement;
