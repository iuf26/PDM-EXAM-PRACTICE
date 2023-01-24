import React, { useContext, useEffect, useState } from "react";
import { IonCol, IonGrid, IonList, IonRow } from "@ionic/react";
import { Item } from "./Item.jsx";
import { UserUnreadMessagesList } from "./UserList.jsx";
import { AppContext } from "../AppContext.jsx";
import axios from "axios";
import { Notification } from "../Notification.jsx";
import { UserMessagesList } from "./UserMessagesList.jsx";

export function List() {
  const { messages } = useContext(AppContext);
  const [user, setUser] = useState([]);

  return messages ? (
    <IonGrid>
      <IonRow>
        <IonCol>
          {/* <Notification /> */}
          <h1>Messages </h1>
         <UserMessagesList user={user}/>
        </IonCol>
        <IonCol>
          <h1>Users List</h1>
          <UserUnreadMessagesList setUser={setUser} />
        </IonCol>
      </IonRow>
    </IonGrid>
  ) : null;
}
