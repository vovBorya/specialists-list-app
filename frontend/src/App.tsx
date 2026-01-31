import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { calendarOutline, gridOutline, chatbubbleOutline, personOutline } from 'ionicons/icons';

import { SpecialistsPage } from '@/features/specialists';

setupIonicReact({
  mode: 'ios',
});

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/schedule">
              <div className="ion-padding">Schedule (Placeholder)</div>
            </Route>
            <Route exact path="/list">
              <SpecialistsPage />
            </Route>
            <Route exact path="/chat">
              <div className="ion-padding">Chat (Placeholder)</div>
            </Route>
            <Route exact path="/profile">
              <div className="ion-padding">Profile (Placeholder)</div>
            </Route>
            <Route exact path="/">
              <Redirect to="/list" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="schedule" href="/schedule">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Schedule</IonLabel>
            </IonTabButton>
            <IonTabButton tab="list" href="/list">
              <IonIcon icon={gridOutline} />
              <IonLabel>List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="chat" href="/chat">
              <IonIcon icon={chatbubbleOutline} />
              <IonLabel>Chat</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
