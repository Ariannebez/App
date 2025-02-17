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

  // Spell checking extracted text using LibreSpell (LanguageTool)
  checkSpelling() {
    if (!this.extractedText.trim()) return;

    const apiUrl = 'https://api.languagetool.org/v2/check'; // LibreSpell API

    // Sending extracted text to spell check API
    this.http.post(apiUrl, {
      text: this.extractedText,
      language: 'en-US' // Change to 'en-GB' if needed
    }).subscribe(
      (response: any) => {
        if (response.matches.length > 0) {
          // Replacing incorrect words with suggestions
          let correctedText = this.extractedText;
          response.matches.forEach((match: any) => {
            if (match.replacements.length > 0) {
              correctedText = correctedText.replace(match.context.text, match.replacements[0].value);
            }
          });
          this.spellCheckedText = correctedText;
        } else {
          this.spellCheckedText = 'No spelling mistakes found.';
        }
      },
      (error: any) => {
        console.error('Error checking spelling:', error);
      }
    );
  }

  // Saving corrected text to tab1
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
