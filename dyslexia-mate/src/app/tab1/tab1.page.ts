import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';  // Import the ImageService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  images: string[] = [];  // Store the list of image URLs

  constructor(private imageService: ImageService) {
    // Subscribe to the image service to get the list of images
    this.imageService.currentImages.subscribe((images: string[]) => {
      this.images = images;  // Update the local list when the image list changes
    });
  }

  // Method to remove an image from the list
  removeImage(index: number) {
    this.imageService.removeImage(index);  // Call the service to remove the image by index
  }

}


