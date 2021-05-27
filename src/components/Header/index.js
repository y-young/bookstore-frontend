import Logo from "@/assets/images/logo.svg";
import {
  BarChartOutlined,
  BookOutlined,
  ControlOutlined,
  FileDoneOutlined,
  FormOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Avatar, Col, Menu, message, Row, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import useAuth from "utils/useAuth";
import styles from "./index.less";

const Header = () => {
  const history = useHistory();
  const auth = useAuth();

  const logout = () => {
    auth.signout();
    message.success("登出成功");
    history.push("/login");
  };

  return (
    <Affix offsetTop={0} className={styles.headerAffix}>
      <header className={styles.header}>
        <Row
          className={styles.headerRow}
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
          <Col span={12}>
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
              {auth.isAdmin() && (
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
              )}
              {auth.isAdmin() && (
                <Menu.SubMenu
                  key="management"
                  title="管理"
                  icon={<ControlOutlined />}
                >
                  <Menu.Item key="book-management">
                    <Link to="/manage/books">书籍管理</Link>
                  </Menu.Item>
                  <Menu.Item key="user-management">
                    <Link to="/manage/users">用户管理</Link>
                  </Menu.Item>
                  <Menu.Item key="order-management">
                    <Link to="/manage/orders">订单管理</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              )}
            </Menu>
          </Col>
          <Col span={6} offset={2}>
            <Menu mode="horizontal" className={styles.rightSubMenu}>
              <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">购物车</Link>
              </Menu.Item>
              {auth.user ? (
                <Menu.SubMenu
                  key="user"
                  title={auth.user.username}
                  icon={<UserOutlined />}
                >
                  <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/settings">设置</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="logout"
                    onClick={logout}
                    icon={<LogoutOutlined />}
                  >
                    登出
                  </Menu.Item>
                </Menu.SubMenu>
              ) : (
                <Menu.SubMenu
                  key="user"
                  title={<Avatar icon={<UserOutlined />} />}
                >
                  <Menu.Item key="login" icon={<LoginOutlined />}>
                    <Link to="/login">登录</Link>
                  </Menu.Item>
                  <Menu.Item key="register" icon={<FormOutlined />}>
                    <Link to="/register">注册</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              )}
            </Menu>
          </Col>
        </Row>
      </header>
    </Affix>
  );
};

export default Header;
