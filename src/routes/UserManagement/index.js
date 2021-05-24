import useRequest from "@umijs/use-request";
import { Badge, Button, Input, message, Table } from "antd";
import PageHeader from "components/PageHeader";

const UserManagement = () => {
  const { data, loading, refresh } = useRequest("/users");
  const { run: disableUser } = useRequest(
    (userId) => ({ method: "post", url: `/users/${userId}/disable` }),
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
      },
    }
  );
  const { run: enableUser } = useRequest(
    (userId) => ({ method: "post", url: `/users/${userId}/enable` }),
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
      },
    }
  );

  const switchDisabled = async (user) => {
    const close = message.loading("正在提交...");
    if (user.disabled) {
      await enableUser(user.id);
    } else {
      await disableUser(user.id);
    }
    refresh();
    close();
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
      render: (_, record) => (
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
      <PageHeader title="用户管理" span={8}>
        <Input.Search placeholder="搜索用户名或电子邮件地址" />
      </PageHeader>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default UserManagement;
