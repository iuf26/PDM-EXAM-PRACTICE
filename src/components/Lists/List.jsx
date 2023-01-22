import React, { useContext, useEffect } from "react";
import {
  IonCol,
  IonGrid,
  IonList,
  IonRow,
} from "@ionic/react";
import { Item } from "./Item.jsx";
import { UserUnreadMessagesList } from "./UserList.jsx";
import {
  usersSortedByCriteria,
} from "../../helpers/list.js";
import { AppContext } from "../AppContext.jsx";

export function List() {
  const { messages } = useContext(AppContext);
  return (
    messages ? 
    <IonGrid>
      <IonRow>
        <IonCol>
          <h1>Messages</h1>
          <IonList>
            {messages.map((elem) => (
              <Item elem={elem} key={elem.id} />
            ))}
          </IonList>
        </IonCol>
        <IonCol>
          <h1>Users List</h1>
          {/* <UserList messagesList={elems} /> */}
          <UserUnreadMessagesList
            elems={usersSortedByCriteria(messages)}
            messages={messages}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
    :
    null
  );
}
