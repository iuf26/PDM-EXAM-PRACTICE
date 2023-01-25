import React, { useContext, useEffect, useState } from "react";
import { IonCard, IonItem, IonAlert } from "@ionic/react";
import { AppContext } from "./AppContextProvider";

export function NotificationNet() {
  const { netConnection } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(true);
  }, [netConnection]);

  return (
    <IonAlert
      isOpen={showAlert}
      onDidDismiss={() => setShowAlert(false)}
      header={`Your internet status changed`}
      message={`Net ${netConnection ? `online` : `offline`}`}
      buttons={["OK"]}
    />
  );
}
