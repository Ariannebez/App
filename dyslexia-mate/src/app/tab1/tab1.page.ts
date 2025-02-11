import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule] // Ensure imports are here
})
export class Tab1Page {
  savedTexts: string[] = [];

  constructor() {
    this.loadSavedTexts();
  }

  loadSavedTexts() {
    this.savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
  }

  removeText(index: number) {
    this.savedTexts.splice(index, 1);
    localStorage.setItem('savedTexts', JSON.stringify(this.savedTexts));
  }
}

