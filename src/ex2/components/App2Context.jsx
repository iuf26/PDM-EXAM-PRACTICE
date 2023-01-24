import React, { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "../../components/AppApi";

export const App2Context = createContext();
export function App2ContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState();
  const [questionIds, setQuestioIds] = useState([]);

  const fetchItems = () => {
    axios
      .get("http://localhost:3000/message")
      .then((resp) => {
        setItems(resp.data);
      })
      .catch((error) => console.error(error));
  };

  const authenticate = (id) => {
    axios
      .post("http://localhost:3000/auth", { id })
      .then((resp) => {
        if(resp.status === 201)
            setIsAuth(true);
        setToken(resp.data.token);
        setQuestioIds(resp.data.questionIds);
      })
      .catch((error) => console.error(error));
  };

  return (
    <App2Context.Provider
      value={{ items, isAuth, authenticate, token, questionIds }}
      {...props}
    />
  );
}
