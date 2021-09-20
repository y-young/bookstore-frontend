import {
  CloseOutlined,
  LogoutOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, List } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "./index.less";
import Message from "./Message";
import UserListPopover from "./UserListPopover";

const UsernameInput = ({ onJoin }) => {
  const [username, setUsername] = useState("");

  const handleJoin = () => {
    if (!username) {
      return;
    }
    onJoin(username);
    setUsername("");
  };

  return (
    <div className={styles.usernameInput}>
      <Input
        placeholder="输入用户名"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        onPressEnter={handleJoin}
        required
      />
      <Button type="primary" onClick={handleJoin}>
        加入聊天室
      </Button>
    </div>
  );
};

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text) {
      return;
    }
    onSend(text);
    setText("");
  };

  return (
    <Input
      bordered={false}
      placeholder="发送消息..."
      suffix={
        <Button shape="circle" icon={<SendOutlined />} onClick={handleSend} />
      }
      value={text}
      onChange={(event) => setText(event.target.value)}
      onPressEnter={handleSend}
      required
    />
  );
};

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState();
  const ref = useRef();
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/api/chat");
    ws.addEventListener("open", () => setSocket(ws));
    ws.onmessage = handleMessage;
    ws.onclose = () => setSocket(undefined);
    ws.onerror = (e) => console.error(e);
  }, []);

  const handleMessage = (event) => {
    const message = JSON.parse(event.data);
    message.time = new Date();
    if (message.type === "userList") {
      setUserList(message.users);
      return;
    }
    setMessages((messages) => [...messages, message]);
    // Scroll to bottom
    const list = ref?.current?.querySelector(".ant-list");
    list?.scrollTo(0, list.scrollHeight);
  };

  const joinChat = (username) => {
    socket?.send(JSON.stringify({ type: "join", username }));
    setUsername(username);
  };

  const sendMessage = (content) => {
    socket?.send(JSON.stringify({ type: "text", content }));
  };

  const leaveChat = () => {
    socket?.send(JSON.stringify({ type: "leave", username }));
    setUsername("");
  };

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={
          open ? [styles.content, styles.active].join(" ") : styles.content
        }
      >
        <div className={styles.header}>
          <div className={styles.title}>
            聊天室
            <UserListPopover userList={userList} />
          </div>
          {username && (
            <div className={styles.userInfo}>
              <UserOutlined />
              {username}
              <Button
                size="small"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={leaveChat}
              />
            </div>
          )}
        </div>
        <List
          loading={!socket}
          dataSource={messages}
          pagination={false}
          renderItem={(message) => <Message message={message} />}
          className={styles.messageList}
        />
        <div className={styles.footer}>
          {username ? (
            <MessageInput onSend={sendMessage} />
          ) : (
            <UsernameInput onJoin={joinChat} />
          )}
        </div>
      </div>
      <Button
        shape="circle"
        size="large"
        onClick={handleToggle}
        icon={open ? <CloseOutlined /> : <MessageOutlined />}
        className={styles.launcher}
      />
    </div>
  );
};

export default Chat;
