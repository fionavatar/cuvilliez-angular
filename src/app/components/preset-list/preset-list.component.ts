import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresetService } from '../../services/preset.service';
import { Preset } from '../../models/preset.model';

@Component({
  selector: 'app-preset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Liste des presets :</h2>
    <ul>
      <li *ngFor="let preset of presets">
        <input [(ngModel)]="preset.name" />
        <button (click)="renamePreset(preset)">Renommer</button>
      </li>
    </ul>
    <p *ngIf="presets.length === 0">Aucun preset disponible...</p>
  `
})
export class PresetListComponent implements OnInit {
  presets: Preset[] = [];

  constructor(private presetService: PresetService) {}

  ngOnInit() {
    console.log('ngOnInit appelé');   // <--- vérifie que le composant se charge
    this.presetService.getPresets().subscribe({
      next: (data: Preset[]) => {
        console.log('Presets récupérés :', data);  // <--- vérifie que les données arrivent
        this.presets = data;
      },
      error: (err) => console.error('Erreur API', err)
    });
  }
  

  renamePreset(preset: Preset) {
    alert(`Renommer preset ${preset.name}`);
  }
}
