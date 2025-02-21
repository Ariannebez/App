import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule] // ✅ Add IonicModule here
})
export class Tab1Page {
  savedTexts: string[] = [];

  constructor() {}

  ionViewWillEnter() {
    // Load saved texts when Tab1 is opened
    this.loadSavedTexts();
  }

  loadSavedTexts() {
    const storedTexts = localStorage.getItem('savedTexts');
    if (storedTexts) {
      this.savedTexts = JSON.parse(storedTexts);
    }
  }

  deleteText(index: number) {
    this.savedTexts.splice(index, 1); // Remove the specific text
    localStorage.setItem('savedTexts', JSON.stringify(this.savedTexts)); // Update storage
  }

 
}

