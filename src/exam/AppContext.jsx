import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { newWebSocket } from "../components/AppApi";
import { Network } from "@capacitor/network";

export const AppContext = createContext();
export function AppContextProvider(props) {
  const [netConnection, setNetConnection] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    Network.addListener("networkStatusChange", async (status) => {
      setNetConnection(status.connected);
    });
  }, []);

  useEffect(() => {
    newWebSocket((message) => {
      console.log({ message });
    });
  }, []);

  return <AppContext.Provider value={{ items, netConnection }} {...props} />;
}
