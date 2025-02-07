import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageUrl: string = ''; // Store the image URL

  setImage(url: string) {
    this.imageUrl = url;
  }

  getImage(): string {
    return this.imageUrl;
  }
}

