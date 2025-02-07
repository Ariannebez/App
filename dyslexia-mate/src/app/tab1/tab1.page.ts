import { Component } from '@angular/core';
import { ImageService } from '../image.service';  // Import the ImageService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  imageUrl: string = ''; // Store the captured image URL

  constructor(private imageService: ImageService) {
    // Subscribe to the image service to get the latest image URL
    this.imageService.currentImage.subscribe((imageUrl: string) => {
      this.imageUrl = imageUrl;
    });
  }

}

