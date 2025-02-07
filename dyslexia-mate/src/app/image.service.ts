import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available globally
})
export class ImageService {

  private imageUrl: string = ''; // Store the image URL

  constructor() { }

  // Set the image URL
  setImageUrl(url: string): void {
    this.imageUrl = url;
  }

  // Get the stored image URL
  getImageUrl(): string {
    return this.imageUrl;
  }
}
