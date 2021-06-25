import useRequest from "@umijs/use-request";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd";
import debounce from "debounce-promise";
import { Link, useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const Register = () => {
  const history = useHistory();
  const { run, loading } = useRequest(
    (data) => ({
      method: "post",
      url: "/users/register",
      data,
    }),
    {
      manual: true,
      onSuccess: () => {
        message.success("注册成功");
        history.push("/login");
      },
    }
  );
  const { run: checkUsername } = useRequest(
    (username) => ({
      method: "post",
      url: "/users/register/checkUsername",
      data: username,
    }),
    {
      manual: true,
      initialData: true,
    }
  );

  return (
    <Row justify="center">
      <Col span={14}>
        <Card className="singleCard" bordered={false}>
          <Typography.Title level={2}>注册</Typography.Title>
          <Form name="register" onFinish={run} {...layout}>
            <Form.Item
              name="username"
              label="用户名"
              hasFeedback
              validateFirst
              rules={[
                { required: true },
                {
                  required: true,
                  validator: debounce(async (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    const result = await checkUsername(value);
                    if (result) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("用户名已存在"));
                  }, 300),
                },
              ]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true }]}
            >
              <Input type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              label="重复密码"
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
            >
              <Input type="password" placeholder="重复密码" />
            </Form.Item>
            <Form.Item
              name="email"
              label="电子邮件地址"
              rules={[
                { required: true },
                { type: "email", message: "请输入有效的电子邮件地址" },
              ]}
            >
              <Input type="email" placeholder="电子邮件地址" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                注册
              </Button>
            </Form.Item>
            已有账户？ <Link to="/login">登录</Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Register;
