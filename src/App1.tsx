import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { Login } from "./ex2/components/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { AppContextProvider } from "./components/AppContext";
import ProtectedRoute from "./ex2/components/ProtectedRoutes";

setupIonicReact();

const App1: React.FC = () => (
  <IonApp>
    <AppContextProvider>
    {/* CHANGE */}
      <IonReactRouter>
        <IonRouterOutlet>
          {/* CHANGE */}
          <Route exact path="/home">
              <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AppContextProvider>
  </IonApp>
);

export default App1;
