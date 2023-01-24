import React, { useCallback, useContext, useState, useEffect } from "react";
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
import { usersSortedByCriteria } from "../../helpers/list.js";
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

export function UserUnreadMessagesList({ setUser }) {
  const {
    messages,
    netConnection,
    setSeenMessagesOfflineMode,
    notifyServerByReadMessages,
  } = useContext(AppContext);
  const [elems, setElems] = useState([]);
  useEffect(() => {
    if (messages) {
      setElems(usersSortedByCriteria(messages));
    }
  }, [messages]);

  const getSeenMessages = useCallback(
    (user) => {
      //structuredClone does a deep copy
      return structuredClone(
        messages
          .filter((current) => current.sender === user && !current.read)
          .map((current) => {
            return { ...current, read: true };
          })
      );
    },
    [messages]
  );

  const onUserClicked = useCallback(
    (user) => {
      if (netConnection) {
        //ONLINE MODE
        notifyServerByReadMessages(getSeenMessages(user));
      } else {
        //OFFLINE MODE
        setSeenMessagesOfflineMode(getSeenMessages(user));
      }
      setUser(user);
    },
    [
      setUser,
      netConnection,
      setSeenMessagesOfflineMode,
      notifyServerByReadMessages,
      getSeenMessages,
    ]
  );

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
