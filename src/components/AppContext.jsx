import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "./AppApi";
import { Network } from "@capacitor/network";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [messages, setMessages] = useState([]);
  const [netConnection, setNetConnection] = useState(true);
  const fetchMessages = () => {
    axios
      .get("http://localhost:3000/message")
      .then((resp) => {
        setMessages(resp.data);
      })
      .catch((error) => console.error(error));
  };

  const setSeenMessagesOfflineMode = (seenMessages) => {
    const oldSeen = JSON.parse(localStorage.getItem("seen")) || seenMessages;
    const newSeen = oldSeen.concat(seenMessages);
    localStorage.setItem("seen", JSON.stringify(newSeen));
  };

  const notifyServerByReadMessages = useCallback(
    (seenMessages) => {
      if (seenMessages) {
        seenMessages.forEach((item) => {
          const toSend = { ...item, read: true };
          axios
            .put(`http://localhost:3000/message/${item.id}`, toSend)
            .catch((error) => error);
        });
        const newMessages = messages.map(
          (obj) => seenMessages.find((elem) => obj.id === elem.id) || obj
        );
        setMessages(structuredClone(newMessages));
      }
    },
    [messages]
  );

  useEffect(() => {
    if (!netConnection) {
      localStorage.setItem("messages", JSON.stringify(messages));
    } else {
      const seenMessages = JSON.parse(localStorage.getItem("seen"));
      notifyServerByReadMessages(seenMessages);
      localStorage.removeItem("messages");
      localStorage.removeItem("seen");
    }
  }, [netConnection, messages, notifyServerByReadMessages]);

  useEffect(() => {
    newWebSocket((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    Network.addListener("networkStatusChange", async (status) => {
      setNetConnection(status.connected);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        messages,
        fetchMessages,
        netConnection,
        setSeenMessagesOfflineMode,
        notifyServerByReadMessages,
      }}
      {...props}
    />
  );
}
