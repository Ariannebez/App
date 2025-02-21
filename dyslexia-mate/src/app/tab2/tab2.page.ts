import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';
import { AxiosError } from 'axios';
import { environment } from 'src/environments/environment'; // Import API key securely
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule,]
})
export class Tab2Page {
  imageUrl: string | null = null;
  extractedText: string = '';
  spellCheckedText: string = '';
  //private apiKey: string = environment.textRazorApiKey; //not being used 

  constructor(private navCtrl: NavController) {}

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

  // Checking spelling of extracted text
  async checkSpelling() {
    try {
      if (this.extractedText.trim()) {
        const response = await axios.post(
          'https://api.languagetool.org/v2/check', // LanguageTool API URL
          new URLSearchParams({
            text: this.extractedText,  // The extracted text from image to check for spelling mistakes
            language: 'en-US',         // Set the language to English
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        );
  
        console.log('Spell check response:', response.data);
  
        let correctedText = this.extractedText; // Start with the full text
  
        if (response.data && response.data.matches.length > 0) {
          response.data.matches.forEach((match: any) => {
            if (match.replacements.length > 0) {
              const incorrectWord = match.context.text.substring(match.offset, match.offset + match.length); // Extract incorrect word
              const replacement = match.replacements[0].value; // Use first suggestion as the correct word
  
              console.log(`Incorrect: "${incorrectWord}" → Corrected: "${replacement}"`);
  
              // Replace incorrect word with highlighted incorrect word and correct word in brackets
              correctedText = correctedText.replace(
                new RegExp(`\\b${incorrectWord}\\b`, 'gi'), 
                `<span class="incorrect-word">${incorrectWord}</span> (<span class="correct-word">${replacement}</span>)`
              );
            }
          });
  
          // Store the fully corrected and highlighted text
          this.spellCheckedText = correctedText;
        } else {
          this.spellCheckedText = this.extractedText; // No mistakes, keep original text
        }
      } else {
        alert('No extracted text to check.');
      }
    } catch (error: unknown) {
      console.error('Error checking spelling:', error);
  
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response);
        alert(`API Error: ${error.response?.statusText || 'Unknown error'}`);
      } else {
        console.error('Unknown Error:', error);
        alert('An error occurred while checking spelling.');
      }
    }
  }
  

  // Saving corrected text or original text to tab1
  async saveText() {
  // Check if there is any extracted text
  if (this.spellCheckedText.trim() || this.extractedText.trim()) {
    // Get the saved texts from localStorage, or initialize as an empty array if none exist
    const savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');

    // Save the corrected text or original text
    const textToSave = this.spellCheckedText.trim() ? this.spellCheckedText : this.extractedText;
    savedTexts.push(textToSave);

    // Save the updated texts back to localStorage
    localStorage.setItem('savedTexts', JSON.stringify(savedTexts));

    // Clear the text and image after saving to tab1
    this.imageUrl = null;
    this.extractedText = '';
    this.spellCheckedText = ''; // Clear the corrected text if saved

    // Navigate to Tab1
    this.navCtrl.navigateForward('/tabs/tab1');
  } else {
    alert('No text to save.');
  }
}

// Removing text and image from tab2 (when clicking remove)
removeImage() {
  // Clear both the image and extracted text
  this.imageUrl = null;
  this.extractedText = '';
  this.spellCheckedText = ''; // Ensure corrected text is also cleared
}
}


