import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available throughout the app
})
export class ImageService {

  // We define the type of the image URL as a string
  private imageSource = new BehaviorSubject<string>(''); // Holds the image URL
  currentImage = this.imageSource.asObservable(); // Expose the image as an observable

  constructor() {}

  // Set the image URL (this method allows other components to update the image URL)
  changeImage(imageUrl: string): void {
    this.imageSource.next(imageUrl); // Update the image URL
  }
}

