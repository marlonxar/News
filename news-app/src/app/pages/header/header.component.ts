import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();
  languages: string[] = ['English', 'Español'];
  selectedLanguage: string = 'English';
  categories: string[] = [
    "General",
    "Politics",
    "Sports",
    "Technology",
    "Business",
    "Health",
    "Science",
    "Entertainment",
    "Travel",
    "Education",
    "Environment"
  ];

  constructor() { }

  ngOnInit(): void { }

  onLanguageChange(event: Event): void {
    this.selectedLanguage = (event.target as HTMLSelectElement).value;
    console.log(`Language selected: ${this.selectedLanguage}`);
  }
}