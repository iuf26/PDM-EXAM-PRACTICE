import React, { useContext, useEffect, useState } from "react";
import {
  IonHeader,
  IonItem,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { App2Context } from "./App2Context";

export function MainPageEx2() {
  const { questionIds, startDownload, downloaded } = useContext(App2Context);
  const [totalQ, setTotalQ] = useState(0);

  useEffect(() => {
    startDownload();
  }, [startDownload]);

  useEffect(() => {
    setTotalQ(questionIds.length);
  }, [questionIds]);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome folks!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <div>Downloading {downloaded}/{totalQ}</div>
        </IonItem>
      </IonContent>
    </IonContent>
  );
}
