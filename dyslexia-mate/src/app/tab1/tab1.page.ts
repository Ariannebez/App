import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  savedImage: string = '';  // Store the saved image URL

  constructor() {}

  // Function to save the image in Tab 1
  saveImage(image: string) {
    this.savedImage = image;
  }

  // Function to remove the saved image
  removeImage() {
    this.savedImage = '';
  }
}

