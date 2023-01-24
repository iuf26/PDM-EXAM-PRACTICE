import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "./AppApi";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [messages, setMessages] = useState([]);
  const fetchMessages = () => {
    axios
      .get("http://localhost:3000/message")
      .then((resp) => {
        setMessages(resp.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    newWebSocket((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  return <AppContext.Provider value={{ messages, setMessages, fetchMessages }} {...props} />;
}
