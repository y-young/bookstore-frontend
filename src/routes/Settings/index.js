import { Button, Card, Col, Form, Input, Row, Typography } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const Settings = () => {
  return (
    <Row justify="center">
      <Col span={14}>
        <Card className="singleCard" bordered={false}>
          <Typography.Title level={2}>设置</Typography.Title>
          <Form name="settings">
            <Form.Item name="username" label="用户名" {...layout}>
              Googleplex
            </Form.Item>
            <Form.Item
              name="email"
              label="电子邮件地址"
              rules={[
                { required: true },
                { type: "email", message: "请输入有效的电子邮件地址" },
              ]}
              {...layout}
            >
              <Input type="email" placeholder="电子邮件地址" />
            </Form.Item>
            <Form.Item
              name="newPassword"
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
              name="password"
              label="当前密码"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input.Password placeholder="当前密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Button type="primary" htmlType="submit" block>
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
