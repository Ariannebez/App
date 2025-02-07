import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraPhoto } from '@capacitor/camera';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  imageUrl: string = ''; // Store the captured image URL

  constructor(private imageService: ImageService) {}

  // Lifecycle hook: Trigger the camera when the tab is entered
  ionViewDidEnter() {
    console.log('Tab2 selected, camera will open.');
    this.takePicture();  // Automatically trigger the camera when the tab is selected
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
      this.imageService.addImage(this.imageUrl);  // Send the image URL to the service to be saved
      console.log('Image saved to shared service');
      this.imageUrl = '';  // Clear the image from the camera tab after saving
    }
  }

  // Remove the image in Tab 2
  removeImage() {
    this.imageUrl = '';  // Clear the image from Tab 2
    console.log('Image removed');
  }
}
