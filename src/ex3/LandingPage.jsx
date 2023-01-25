import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonCard,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { AppContext } from "./AppContextProvider";
import { Item } from "./Item";
import { NotificationNet } from "./NotificationNet";

export function LandingPage() {
  const { itemsQ, updateOrderOnServer,totalUpdates, progress } = useContext(AppContext);
  const [itemsForDisplay, setItemsForDisplay] = useState([]);
  const [userInputQ, setUserInputQ] = useState();
  useEffect(() => {
    if (itemsQ) setItemsForDisplay(itemsQ);
  }, [itemsQ]);

  const showAll = useCallback(() => {
    setItemsForDisplay(itemsQ);
  }, [itemsQ]);

  const showFiltered = useCallback(() => {
    const filtered = itemsQ.filter((elem) => elem.quantity === userInputQ);
    setItemsForDisplay(filtered);
  }, [itemsQ, userInputQ]);

  const onSubmit = useCallback(() => {
    updateOrderOnServer();
  }, [updateOrderOnServer]);

  return (
    <>
      <IonContent>
        <NotificationNet/>
        <IonButton onClick={showAll}>Show All</IonButton>

        <IonInput
          onInput={(ev) => {
            setUserInputQ(parseInt(ev.target.value));
          }}
        >
          {" "}
          Quantity:
        </IonInput>
        <IonButton onClick={showFiltered}>Filter by Quantity</IonButton>
        {itemsForDisplay
          ? itemsForDisplay.map((elem, index) => (
              <Item elem={elem} index={index} />
            ))
          : null}
        <IonButton onClick={onSubmit}>Submit</IonButton>
        <IonLabel>Sending to server {progress}/{totalUpdates} </IonLabel>
      </IonContent>
    </>
  );
}
