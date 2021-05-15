import React, { useEffect, useRef } from "react";
import "./Message.css";
import { useSpring, animated } from "react-spring";

function Message({ username, message }) {
  const isUser = username === message.username;
  const messageRef = useRef();
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200,
  });

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        block: "end",
        inline: "nearest",
      });
    }
  }, [message]);

  return (
    <animated.div style={props}>
      <div
        className={
          isUser ? "message__userContainer" : "message__guestContainer"
        }
        ref={messageRef}
      >
        <p className={isUser ? "message__userCard" : "message__guestCard"}>
          {isUser ? message.text : `${message.username}♥️: ${message.text}`}
        </p>
      </div>
    </animated.div>
  );
}

export default Message;
