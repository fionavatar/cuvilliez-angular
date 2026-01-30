import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Preset } from '../../models/preset.model';
import { PresetService } from '../../services/preset.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-preset-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './preset-detail.component.html',
})
export class PresetDetailComponent implements OnInit {
    preset?: Preset;
    newName = '';
    

  constructor(
    private presetService: PresetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];

    this.presetService.getPreset(name)
      .subscribe(preset => {
        this.preset = preset;
        this.newName = preset.name;

      });
  }

  onDeletePreset() {
    if (!this.preset) return;

    this.presetService.deletePreset(this.preset.name)
      .subscribe(() => {
        this.router.navigate(['/presets']);
      });
  }

  onRenamePreset() {
    if (!this.preset) return;
  
    const updatedPreset: Preset = {
      ...this.preset,
      name: this.newName
    };
  
    this.presetService
      .updatePreset(this.preset.name, updatedPreset)
      .subscribe({
        next: () => {
          console.log('Preset renommé');
          this.router.navigate(['/presets']);
        },
        error: err => console.error('Erreur renommage', err)
      });
  }
  
}
