import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresetListComponent } from './components/preset-list/preset-list.component';
import { AddPresetComponent } from './components/add-preset/add-preset.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PresetListComponent, AddPresetComponent],
  template: `
    <app-preset-list></app-preset-list>
    <app-add-preset></app-add-preset> 

  `
})
export class AppComponent {}
