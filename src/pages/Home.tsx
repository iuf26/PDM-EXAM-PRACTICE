import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { List } from '../components/Lists/List';
import { MainPageEx2 } from '../ex2/components/MainPageEx2';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* CHANGE */}
       {/* <List/> */}
       <MainPageEx2/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
