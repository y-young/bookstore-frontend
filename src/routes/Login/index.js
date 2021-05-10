import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useRequest from "@umijs/use-request";
import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import useAuth from "utils/useAuth";

const Login = () => {
  const history = useHistory();
  const auth = useAuth();
  const { run, loading } = useRequest(
    (data) => ({
      method: "post",
      url: "/users/login",
      data,
    }),
    {
      manual: true,
      onSuccess: (data) => {
        const { user, authorization } = data;
        auth.signin(user, authorization);
        message.success("登录成功");
        history.push("/");
      },
    }
  );

  return (
    <Row justify="center">
      <Col span={10}>
        <Card className="singleCard" bordered={false}>
          <Typography.Title level={2}>登录</Typography.Title>
          <Form name="login" onFinish={run}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                登录
              </Button>
            </Form.Item>
            或 <Link to="/register">注册账户</Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
