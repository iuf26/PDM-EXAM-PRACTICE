import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "../components/AppApi";
import { Network } from "@capacitor/network";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [netConnection, setNetConnection] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsQ, setItemsQ] = useState([]);
  const [totalUpdates, setTotalUpdates] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ wrongCounts, setWrongCounts]  = useState([]);

  const updateQ = useCallback(
    (elem) => {
      if (itemsQ) {
        const newValue = itemsQ.map((item) =>
          item.code === elem.code ? { ...elem } : { ...item }
        );
        setItemsQ(newValue);
        localStorage.setItem("order", JSON.stringify(newValue));
      }
    },
    [itemsQ]
  );

  const updateOrderOnServer = useCallback(() => {
    const ordersToUpdateCount = itemsQ.filter((elem) => elem.quantity > 0).length;
    const wrong = itemsQ.filter((elem) => elem.quantity < 0)
    if(wrong.length > 0)setWrongCounts(wrong)
    setTotalUpdates(ordersToUpdateCount);
    setProgress(0);
    itemsQ.forEach((elem) => {
      if (elem.quantity > 0) {
        axios
          .post("http://localhost:3000/item", {
            code: elem.code,
            quantity: elem.quantity,
          })
          .then((resp) => {
            setProgress(progress => progress + 1);
          })
          .catch((error) => console.error(error));
         
      }
    });
  }, [itemsQ]);

  useEffect(() => {
    if (!localStorage.getItem("items")) {
      newWebSocket((message) => {
        // setMessages((prevMessages) => [...prevMessages, message]);
        const itemsOrder = message.map((elem) => {
          return { ...elem, quantity: 0 };
        });
        setItems(message);
        setItemsQ(itemsOrder);
        localStorage.setItem("items", JSON.stringify(message));
        localStorage.setItem("order", JSON.stringify(itemsOrder));
        console.log({ message });
      });
      return;
    }
    setItems(JSON.parse(localStorage.getItem("items")));
    setItemsQ(JSON.parse(localStorage.getItem("order")));
  }, []);

  useEffect(() => {
    Network.addListener("networkStatusChange", async (status) => {
      setNetConnection(status.connected);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ itemsQ, updateQ, updateOrderOnServer, totalUpdates,progress, netConnection,wrongCounts }}
      {...props}
    />
  );
}
