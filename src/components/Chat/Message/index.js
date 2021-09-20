import { Col, Row } from "antd";
import UserAvatar from "../UserAvatar";
import styles from "./index.less";

const Message = ({ message }) => {
  switch (message.type) {
    case "join":
      return (
        <div className={styles.eventMessage}>
          <UserAvatar username={message.username} size="small" />{" "}
          {message.username} 加入了聊天室 ({message.time?.toLocaleTimeString()})
        </div>
      );
    case "leave":
      return (
        <div className={styles.eventMessage}>
          <UserAvatar username={message.username} size="small" />{" "}
          {message.username} 离开了聊天室 ({message.time?.toLocaleTimeString()})
        </div>
      );
    case "text": {
      return (
        <Row wrap={false} className={styles.message}>
          <Col flex="none">
            <UserAvatar username={message.sender} />
          </Col>
          <Col flex="auto" className={styles.detail}>
            <div className={styles.sender}>
              {message.sender} [{message.time?.toLocaleTimeString()}]
            </div>
            <div className={styles.content}>{message.content}</div>
          </Col>
        </Row>
      );
    }
    default:
      return null;
  }
};

export default Message;
