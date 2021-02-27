import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.less";

const Login = () => {
  return (
    <Row justify="center">
      <Col span={10}>
        <Card className={styles.loginCard} bordered={false}>
          <Typography.Title level={2} className={styles.loginTitle}>
            登录
          </Typography.Title>
          <Form name="login">
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
              <Button type="primary" htmlType="submit" block>
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
