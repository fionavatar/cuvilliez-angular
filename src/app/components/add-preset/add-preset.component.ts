import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PresetService } from '../../services/preset.service';
import { Router } from '@angular/router';
import { Preset } from '../../models/preset.model';

@Component({
  selector: 'app-add-preset',
  standalone: true,
  imports: [ CommonModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './add-preset.component.html',
  styleUrls: ['./add-preset.component.css']
})
export class AddPresetComponent {
  presetName = '';
  presetType = '';
  sampleUrls = ''; 

  @Output() newPreset = new EventEmitter<Preset>();

  constructor(
    private presetService: PresetService,
    private router: Router
  ) {}

  onSubmit(event: any) {
    event.preventDefault();

    const samples = this.sampleUrls
      .split('\n')
      .filter(url => url.trim() !== '')
      .map(url => ({
        name: url.split('/').pop()?.split('.')[0] || 'sample',
        url
      }));

    const newPreset: Preset = {
      name: this.presetName,
      type: this.presetType,
      samples
    };

    // Appel au service pour créer le preset
    this.presetService.createPreset(newPreset)
      .subscribe({
        next: (preset) => {
          console.log('Preset créé :', preset);
          this.newPreset.emit(preset); // optionnel, si parent veut réagir
          this.router.navigate(['/presets']); // revenir à la liste
        },
        error: (err) => console.error('Erreur création preset', err)
      });
  }
}
