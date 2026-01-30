import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresetListComponent } from './components/preset-list/preset-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PresetListComponent],
  template: `
    <app-preset-list></app-preset-list>
    <h1>Angular fonctionne</h1>
  `
})
export class AppComponent {}
