import React, { useState } from "react";
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

export function UserUnreadMessagesList({ elems, messages }) {
  const [messagesToDisplay, setMessagesToDisplay] = useState([]);
  const accordionGroupChange = (ev) => {
    const user = ev.target.value;
    setMessagesToDisplay(
      messages
        .filter((current) => current.sender === user)
        .map((current) => <Item elem={current} key={current.id} />)
    );
  };

  return (
    <IonAccordionGroup onIonChange={accordionGroupChange}>
      {elems.map((elem, index) => (
        <IonAccordion value={elem.user}>
          <IonItem slot="header" color="light">
            <IonLabel>
              {elem.user} [{elem.unreadCount}] date: {elem.lastUnread}
            </IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {messagesToDisplay}
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
}
