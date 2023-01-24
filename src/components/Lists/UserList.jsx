import React, { useCallback, useContext, useState } from "react";
import {
  IonHeader,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonAccordion,
  IonAccordionGroup,
  AccordionGroupCustomEvent,
} from "@ionic/react";
import { Item } from "./Item";
import { getUsers } from "../../helpers/list";
import axios from "axios";
import { AppContext } from "../AppContext.jsx";

export function UserList({ messagesList }) {
  return (
    <IonList>
      <IonHeader>
        <IonLabel> senders list </IonLabel>
      </IonHeader>
      {getUsers(messagesList).map((elem, index) => (
        <Item elem={elem} key={index} />
      ))}
    </IonList>
  );
}

export function UserUnreadMessagesList({ elems, setUser }) {
  const { messages, fetchMessages  } = useContext(AppContext);

  const onUserClicked = useCallback((user) => {
    const updatedMessages = [];
    messages.forEach((elem) => {
      if (elem.sender === user && !elem.read) {
        updatedMessages.push({ ...elem, read: true });
        return;
      }
      updatedMessages.push({ ...elem });
    });

    messages
      .filter((current) => current.sender === user && !current.read)
      .forEach((item) => {
        const toSend = { ...item, read: true };
        axios
          .put(`http://localhost:3000/message/${item.id}`, toSend)
          .catch((error) => error);
      });
    setUser(user)
    fetchMessages();
  },[messages,setUser,fetchMessages]);

  return (
    <IonList>
      {elems.map((elem, index) => (
        <IonItem
          value={elem.user}
          onClick={() => {
            onUserClicked(elem.user);
          }}
          style={{ cursor: "pointer" }}
          key={index}
        >
          <IonLabel>
            {elem.user} [{elem.unreadCount}] date: {elem.lastUnread}
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
