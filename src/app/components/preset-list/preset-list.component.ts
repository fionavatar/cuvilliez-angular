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
        <button (click)="deletePreset(preset)">Supprimer</button>
      </li>
    </ul>
    <p *ngIf="presets.length === 0">Aucun preset disponible...</p>
  `
})
export class PresetListComponent implements OnInit {
  presets: Preset[] = [];

  constructor(private presetService: PresetService) {}

  ngOnInit() {
    console.log('ngOnInit appelé');   
    this.presetService.getPresets().subscribe({
      next: (data: Preset[]) => {
        console.log('Presets récupérés :', data);  
        this.presets = data;
      },
      error: (err) => console.error('Erreur API', err)
    });
  }
  

  renamePreset(preset: Preset) {
    const newName = prompt('Nouveau nom du preset', preset.name); //on récup le nouveau nom
    if (!newName) return;
  
    this.presetService.updatePreset(preset.name, { ...preset, name: newName })
      .subscribe(() => {
        preset.name = newName; 
        console.log(`Preset renommé en ${newName}`);
      });
  }
  

  deletePreset(preset: Preset) {
    if (!confirm(`Voulez-vous vraiment supprimer le preset "${preset.name}" ?`)) return;

    this.presetService.deletePreset(preset.name).subscribe({
      next: () => {
        console.log(`Preset ${preset.name} supprimé`);
        // On retire le preset de la liste locale pour mettre à jour l'affichage
        this.presets = this.presets.filter(p => p !== preset);
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
}
