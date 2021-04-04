import Logo from "@/assets/images/logo.svg";
import {
  BarChartOutlined,
  BookOutlined,
  FileDoneOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Avatar, Col, Menu, Row, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import styles from "./index.less";

const Header = () => {
  const history = useHistory();

  return (
    <Affix offsetTop={0} className={styles.headerAffix}>
      <header className={styles.header}>
        <Row
          style={{ height: "100%", maxWidth: "782pt", margin: "0 auto" }}
          gutter={16}
          align="middle"
          justify="space-around"
        >
          <Col span={4}>
            <div
              onClick={() => history.push("/")}
              className={styles.logoWrapper}
            >
              <img className={styles.logo} src={Logo} alt="E-Book" />
              <Typography.Title level={3} className={styles.logoText}>
                E-Book
              </Typography.Title>
            </div>
          </Col>
          <Col span={15}>
            <Menu mode="horizontal">
              <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="books" icon={<BookOutlined />}>
                <Link to="/books">书籍</Link>
              </Menu.Item>
              <Menu.Item key="orders" icon={<FileDoneOutlined />}>
                <Link to="/orders">订单</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="statistics"
                title="统计"
                icon={<BarChartOutlined />}
              >
                <Menu.Item key="statistics-books">
                  <Link to="/statistics/books">书籍销量榜</Link>
                </Menu.Item>
                <Menu.Item key="statistics-users">
                  <Link to="/statistics/users">用户消费榜</Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="book-management">
                <Link to="/manage/books">书籍管理</Link>
              </Menu.Item>
              <Menu.Item key="user-management">
                <Link to="/manage/users">用户管理</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={5}>
            <Menu mode="horizontal">
              <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">购物车</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="user"
                title={<Avatar icon={<UserOutlined />} />}
              >
                <Menu.Item key="login">
                  <Link to="/login">登录</Link>
                </Menu.Item>
                <Menu.Item key="register">
                  <Link to="/register">注册</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </header>
    </Affix>
  );
};

export default Header;
