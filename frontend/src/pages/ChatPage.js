import React, { useState, useEffect, useContext } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import AuthContext from "../context/AuthContext";
import { UsersNav } from "../components/UsersNav";


export function Chat() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");

  let { user, authToken } = useContext(AuthContext)
  const log = location.href.split('/')

  useEffect(() => {
    getUsersMessage()
  }, [])


  let getUsersMessage = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/users-messages/${log[4]}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    })
    let data = await response.json()
    setMessageHistory(data)
  }

  let sendUsersMessage = async (message) => {
    const log = location.href.split('/')
    let response = await fetch(`http://127.0.0.1:8000/api/users-messages/${log[4]}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      },
      body: JSON.stringify({ 'from_user': user.user_id, 'to_user': log[4], 'content': message })
    })

    let data = await response.json()
    setMessageHistory(data)
  }

  let channelName = [user.user_id, log[4]].sort().join('_')
  const { readyState, sendJsonMessage } = useWebSocket(`ws://127.0.0.1:8000/${channelName}/`, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    // onMessage handler
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      getUsersMessage()

    }
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  const handleSubmit = () => {
    sendUsersMessage(message)
    sendJsonMessage({
      type: "chat_message",
      message,
    });
    setMessage("");
  };

  return (
    <div>
      <span>The WebSocket is currently {connectionStatus}</span>
      <input
        name="message"
        placeholder="Message"
        onChange={handleChangeMessage}
        value={message}
        className="ml-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
      />
      <button className="ml-3 bg-gray-300 px-3 py-1" onClick={handleSubmit}>
        Submit
      </button>
      <hr />
      <ul>
        {messageHistory.map((message, idx) => (
          <div className="border border-gray-200 py-3 px-3" key={idx}>
            {message.content}
          </div>
        ))}
      </ul>
    </div>
  );
}
