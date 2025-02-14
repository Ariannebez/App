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
    this.loadSavedTexts();
  }

  loadSavedTexts() {
    this.savedTexts = JSON.parse(localStorage.getItem('savedTexts') || '[]');
  }

  //Removing scanned text from tab1
  removeText(index: number) {
    this.savedTexts.splice(index, 1);
    localStorage.setItem('savedTexts', JSON.stringify(this.savedTexts));
  }
}


