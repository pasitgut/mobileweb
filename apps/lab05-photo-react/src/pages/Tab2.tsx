import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";
import { camera } from "ionicons/icons";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const Tab2: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          <IonTitle size="small">
            Lab05 - โดย นายพสิษฐ์ ผลวิเศษพรสุข 663380020-7
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
            <IonTitle size="small">
              Lab05 - โดย นายพสิษฐ์ ผลวิเศษพรสุข 663380020-7
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
