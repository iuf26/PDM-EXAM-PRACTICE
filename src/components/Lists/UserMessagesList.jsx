import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { IonList } from "@ionic/react";
import { Item } from "./Item";

export function UserMessagesList({ user }) {
  const { messages } = useContext(AppContext);
  const [userMessages, setUserMessages] = useState([]);
  useEffect(() => {
    console.log('user changed');
    const newValue = messages
      .filter((current) => current.sender === user)
      .sort((a, b) => b.created - a.created);
    setUserMessages(newValue);
  }, [messages, user]);

  return (
    <IonList>
      {userMessages.length > 0
        ? userMessages.map((elem, index) => <Item elem={elem} key={index} />)
        : null}
    </IonList>
  );
}
