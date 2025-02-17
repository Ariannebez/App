import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as Tesseract from 'tesseract.js';
import { HttpClient } from '@angular/common/http';

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
  spellCheckedText: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  // Taking picture using camera
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

  // Extracting text from image
  async extractText(image: string) {
    try {
      const { data: { text } } = await Tesseract.recognize(image, 'eng');
      this.extractedText = text;
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  }

  // Spell checking extracted text
  checkSpelling() {
    if (!this.extractedText.trim()) return;

    const apiUrl = 'YOUR_SPELL_CHECK_API_URL'; // Replace with a real API endpoint

    this.http.post(apiUrl, { text: this.extractedText }).subscribe(
      (response: any) => {
        this.spellCheckedText = response.correctedText || 'No changes needed';
      },
      (error: any) => {
        console.error('Error checking spelling:', error);
      }
    );
  }

  // Saving extracted text to tab1
  saveText() {
    if (this.spellCheckedText.trim()) {
      const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
      savedTexts.push(this.spellCheckedText);
      localStorage.setItem('savedTexts', JSON.stringify(savedTexts));

      // Clearing text and image after saving to tab1 
      this.imageUrl = null;
      this.extractedText = '';
      this.spellCheckedText = '';

      // Navigating to Tab1
      this.navCtrl.navigateForward('/tabs/tab1');
    }
  }

  // Removing image from tab2  
  removeImage() {
    this.imageUrl = null;
    this.extractedText = '';
    this.spellCheckedText = '';
  }
}

