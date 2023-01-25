import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "../../components/AppApi";

export const App2Context = createContext();
export function App2ContextProvider(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState();
  const [questionIds, setQuestioIds] = useState([]);
  const [downloaded, setDownloaded] = useState(0);
  const [questionsDownloaded, setQuestionsDownlaoded ] = useState(false);

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
        if (resp.status === 201) setIsAuth(true);
        setToken(resp.data.token);
        setQuestioIds(resp.data.questionIds);
      })
      .catch((error) => console.error(error));
  };

  const startDownload = useCallback(() => {
    if (questionIds.length > 0 && downloaded < questionIds.length) {
      questionIds.forEach((elem) => {
        axios.get(`http://localhost:3000/question/${elem}`).then((resp) => {
            if(downloaded + 1  === questionIds.length)setQuestionsDownlaoded(true)
          setDownloaded(downloaded + 1);
        });
      });
    }
  }, [questionIds, downloaded]);

  return (
    <App2Context.Provider
      value={{
        items,
        isAuth,
        authenticate,
        token,
        questionIds,
        downloaded,
        startDownload,
        questionsDownloaded
      }}
      {...props}
    />
  );
}
