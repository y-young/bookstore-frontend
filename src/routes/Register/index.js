import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./index.less";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const Register = () => {
  return (
    <Row justify="center">
      <Col span={14}>
        <Card className={styles.registerCard} bordered={false}>
          <Typography.Title level={2} className={styles.registerTitle}>
            注册
          </Typography.Title>
          <Form name="register">
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
              {...layout}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true }]}
              {...layout}
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
              {...layout}
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
              {...layout}
            >
              <Input placeholder="电子邮件地址" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Button type="primary" htmlType="submit" block>
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
