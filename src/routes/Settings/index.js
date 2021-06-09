import useRequest from "@umijs/use-request";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd";
import useAuth from "utils/useAuth";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const Settings = () => {
  const auth = useAuth();
  const { user } = auth;
  const { run, loading } = useRequest(
    (data) => ({
      method: "put",
      url: "/users/password",
      data,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("操作成功");
      },
    }
  );

  return (
    <Row justify="center">
      <Col span={14}>
        <Card className="singleCard" bordered={false}>
          <Typography.Title level={2}>设置</Typography.Title>
          <Form name="settings" onFinish={run}>
            <Form.Item label="用户名" {...layout}>
              {user?.username}
            </Form.Item>
            <Form.Item label="电子邮件地址" {...layout}>
              {user?.email}
            </Form.Item>
            <Form.Item
              name="password"
              label="新密码"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input type="password" placeholder="新密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              label="重复新密码"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次输入的密码不匹配");
                  },
                }),
              ]}
              {...layout}
            >
              <Input type="password" placeholder="重复密码" />
            </Form.Item>
            <Form.Item
              name="currentPassword"
              label="当前密码"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input.Password placeholder="当前密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Button type="primary" htmlType="submit" loading={loading} block>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Settings;
