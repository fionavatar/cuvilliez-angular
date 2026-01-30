import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Preset } from '../../models/preset.model';
import { PresetService } from '../../services/preset.service';

@Component({
  selector: 'app-preset-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './preset-detail.component.html',
})
export class PresetDetailComponent implements OnInit {
  preset?: Preset;

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
      });
  }

  onDeletePreset() {
    if (!this.preset) return;

    this.presetService.deletePreset(this.preset.name)
      .subscribe(() => {
        this.router.navigate(['/presets']);
      });
  }
}
