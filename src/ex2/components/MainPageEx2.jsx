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

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome folks!</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonContent>
  );
}
