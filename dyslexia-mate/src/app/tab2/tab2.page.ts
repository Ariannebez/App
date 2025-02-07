import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraPhoto } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page {

  imageUrl: string = ''; // Store the captured image URL

  constructor() {}

  // Lifecycle hook: Runs every time the user enters the tab
  ionViewDidEnter() {
    this.takePicture();
  }

  // Function to capture an image from the camera
  async takePicture() {
    try {
      const image: CameraPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      // Ensure webPath is defined before setting it
      this.imageUrl = image.webPath ?? '';

    } catch (error) {
      console.error('Camera error:', error);
    }
  }
}




