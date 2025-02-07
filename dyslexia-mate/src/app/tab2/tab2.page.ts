import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor() {}

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // Checking if the image.webPath is defined
    const imageUrl = image.webPath ?? '';

    const imageElement: HTMLImageElement = document.getElementById('image') as HTMLImageElement;
    imageElement.src = imageUrl;
  };

}




