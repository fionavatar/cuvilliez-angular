import { Routes } from '@angular/router';
import { PresetListComponent } from './components/preset-list/preset-list.component';
import { PresetDetailComponent } from './components/preset-detail/preset-detail.component';
import { AddPresetComponent } from './components/add-preset/add-preset.component';

export const routes: Routes = [
  { path: 'presets', component: PresetListComponent },
  { path: 'presets/:name', component: PresetDetailComponent },
  { path: '', redirectTo: 'presets', pathMatch: 'full' }
];
