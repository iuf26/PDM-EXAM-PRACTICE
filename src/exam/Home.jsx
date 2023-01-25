import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LandingPage } from "./LandingPage";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome Home, user!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <LandingPage/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
