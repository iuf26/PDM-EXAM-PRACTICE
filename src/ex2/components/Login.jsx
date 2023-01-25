import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
} from "@ionic/react";
import { App2Context } from "./App2Context";
import { Redirect, useLocation } from "react-router-dom";

export function Login() {
  const { authenticate, isAuth, questionIds, startDownload, downloaded, questionsDownloaded } =
    useContext(App2Context);
  const [id, setId] = useState();
  const [totalQ, setTotalQ] = useState(0);
  let location = useLocation();
  const onLogin = () => {
    authenticate(id);
  };

  useEffect(() => {
    if (isAuth) startDownload();
  }, [isAuth, startDownload]);

  useEffect(() => {
    setTotalQ(questionIds.length);
  }, [questionIds]);

  return !questionsDownloaded ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>ID</IonLabel>
          <IonInput
            type="text"
            required
            onIonChange={(ev) => {
              setId(ev.target.value);
            }}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={onLogin}>Login</IonButton>
        </IonItem>
        <IonContent>
          {isAuth ? (
            <IonItem>
              <div>
                Downloading {downloaded}/{totalQ}
              </div>
            </IonItem>
          ) : null}
        </IonContent>
      </IonContent>
    </IonPage>
  ) : (
    <Redirect to="/home" state={{ from: location }} replace />
  );
}
