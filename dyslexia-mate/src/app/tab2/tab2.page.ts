import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as Tesseract from 'tesseract.js';
import { NavController } from '@ionic/angular';
import { Buffer } from 'buffer';

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
    const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
    savedTexts.push(this.extractedText);
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));

    // Navigate to Tab1 after saving
    this.navCtrl.navigateForward('/tabs/tab1');
  }

  removeImage() {
    this.imageUrl = null;
    this.extractedText = '';
  }
}
