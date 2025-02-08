import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available throughout the app
})
export class ImageService {

  // Store an array of images (instead of just one)
  private imagesSource = new BehaviorSubject<string[]>([]); 
  currentImages = this.imagesSource.asObservable();  // Observable to get the current list of images

  constructor() {}

  // Method to add a new image URL to the list
  addImage(imageUrl: string): void {
    const currentImages = this.imagesSource.getValue();  // Get current list of images
    this.imagesSource.next([...currentImages, imageUrl]);  // Add the new image and update the list
  }

  // Method to remove an image from the list by index
  removeImage(index: number): void {
    const currentImages = this.imagesSource.getValue();
    currentImages.splice(index, 1);  // Remove the image at the specified index
    this.imagesSource.next([...currentImages]);  // Update the list
  }
}