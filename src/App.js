import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0.4),
    },
  }));

  const classes = useStyles();

  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setUsername(prompt("이름이 모니?", ""));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ message: doc.data(), id: doc.id }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <section className="chat__container">
        <div className="chatbox">
          <FlipMove enterAnimation="fade">
            {messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message} />
            ))}
          </FlipMove>
        </div>
        <form className="inputbox">
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            variant="outlined"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            size="big"
          >
            send
          </Button>
        </form>
      </section>
    </div>
  );
}

export default App;
