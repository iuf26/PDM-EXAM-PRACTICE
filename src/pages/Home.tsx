import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { List } from '../components/Lists/List';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to my app</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <List/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
