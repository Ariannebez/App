import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class Tab2Page {
  imageUrl: string | null = null;
  extractedText: string = '';

  constructor(private navCtrl: NavController) {}

  async captureImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl
      });

      if (image.dataUrl) {
        this.imageUrl = image.dataUrl;
        this.extractText(image.dataUrl);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  async extractText(image: string) {
    try {
      const { data: { text } } = await Tesseract.recognize(image, 'eng');
      this.extractedText = text;
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  }

  saveText() {
    if (this.extractedText.trim()) {
      const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
      savedTexts.push(this.extractedText);
      localStorage.setItem('savedTexts', JSON.stringify(savedTexts));
  
      // Clear text and image after saving
      this.imageUrl = null;
      this.extractedText = '';
  
      // Navigate to Tab1
      this.navCtrl.navigateForward('/tabs/tab1');
    }
  }

  removeImage() {
    this.imageUrl = null;
    this.extractedText = '';
  }
}
