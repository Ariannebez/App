import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraPhoto } from '@capacitor/camera';
import { ImageService } from '../image.service';  // Import the ImageService

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  imageUrl: string = ''; // Store the captured image URL

  constructor(private imageService: ImageService) {}

  // Lifecycle hook: Runs when the user enters the tab and camera should be available.
  ionViewDidEnter() {
    console.log('Camera tab loaded');
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
      console.log('Image captured:', this.imageUrl);

    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  // Save the image using the shared service
  saveImage() {
    if (this.imageUrl) {
      this.imageService.changeImage(this.imageUrl);  // Send the image URL to the service
      console.log('Image saved to shared service');
    }
  }

  // Remove the image in Tab 2
  removeImage() {
    this.imageUrl = '';
    console.log('Image removed');
  }
}
