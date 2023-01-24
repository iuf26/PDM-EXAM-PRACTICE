import React, { useContext, useEffect, useState } from "react";
import { IonCard, IonItem, IonAlert } from "@ionic/react";
import { AppContext } from "./AppContext";

export function Notification() {
  const { messages } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  const [lastMessage, setLastMessage] = useState();
  useEffect(() => {
    if (messages) {
      setLastMessage(messages.at(-1));
      setShowAlert(true);
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 500);
  }, [messages]);

  return lastMessage ? (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header="You've got new message"
      subHeader={lastMessage.sender}
      message={lastMessage.text}
      buttons={["OK"]}
    />
  ) : null;
}
