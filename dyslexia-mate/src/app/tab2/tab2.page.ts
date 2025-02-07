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

  ionViewDidEnter() {
    this.takePicture();
  }

  // Function to capture an image
  async takePicture() {
    try {
      const image: CameraPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      this.imageUrl = image.webPath ?? '';  // Store the image URL

    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  saveImage() {
    console.log('Image saved:', this.imageUrl);
    // Add the save logic here
  }

  removeImage() {
    this.imageUrl = '';
  }
}
