import React, { useEffect, useRef, useState } from "react";
import { MessageBox, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { colors, fonts } from "../../styles/basic";
import { CommentWrap } from "../../styles/album/album";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message) {
      const newComment = {
        title: `선생님`,
        position: "left",
        type: "text",
        text: message,
        date: new Date(),
      };
      setComments([...comments, newComment]);
      setMessage("");
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <CommentWrap>
      <div>
        {comments.map((comment, index) => (
          <MessageBox
            lockable={true}
            key={index}
            position={comment.title === "선생님" ? "left" : "right"}
            type={"text"}
            text={comment.text}
            title={comment.title}
            date={comment.date}
            dateString={comment.date.toLocaleTimeString()}
            dataSource={[
              {
                avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
                unread: 3,
              },
            ]}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <Input
        inputStyle={{
          fontFamily: `${fonts.kotraHope}`,
          fontSize: "1.5rem",
          minheight: "3rem",
          color: `${colors.grayDeep}`,
        }}
        placeholder="내용을 입력하세요..."
        color={`colors.orangeLight`}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        rightButtons={
          <Button
            color={`${colors.orangeLight}`}
            backgroundColor={`${colors.orangeDeep}`}
            text="발송"
            onClick={handleSendMessage}
          />
        }
      />
    </CommentWrap>
  );
};

export default Comment;
