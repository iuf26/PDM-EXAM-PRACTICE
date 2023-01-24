import React, { useContext, useEffect, useState } from "react";
import { IonCol, IonGrid, IonList, IonRow } from "@ionic/react";
import { Item } from "./Item.jsx";
import { UserUnreadMessagesList } from "./UserList.jsx";
import { usersSortedByCriteria } from "../../helpers/list.js";
import { AppContext } from "../AppContext.jsx";
import axios from "axios";
import { Notification } from "../Notification.jsx";
import { UserMessagesList } from "./UserMessagesList.jsx";

export function List() {
  const { messages } = useContext(AppContext);
  const [user, setUser] = useState([]);
  const [elems, setElems] = useState([]);
  useEffect(() => {
    if (messages) {
      setElems(usersSortedByCriteria(messages));
    }
  }, [messages]);
  return messages ? (
    <IonGrid>
      <IonRow>
        <IonCol>
          <Notification />
          <h1>Messages </h1>
         <UserMessagesList user={user}/>
        </IonCol>
        <IonCol>
          <h1>Users List</h1>
          <UserUnreadMessagesList elems={elems} setUser={setUser} />
        </IonCol>
      </IonRow>
    </IonGrid>
  ) : null;
}
