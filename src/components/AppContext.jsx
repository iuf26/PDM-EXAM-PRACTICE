import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/message")
      .then((resp) => {
        setMessages(resp.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return <AppContext.Provider value={{ messages }} {...props} />;
}
