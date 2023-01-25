import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LandingPage } from "./LandingPage.jsx";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome home 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LandingPage />
      </IonContent>
    </IonPage>
  );
};

export default Home;
