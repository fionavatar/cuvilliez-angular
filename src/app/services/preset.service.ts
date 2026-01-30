import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preset } from '../models/preset.model';

@Injectable({
    providedIn: 'root'
  })
  export class PresetService {
    constructor(private http: HttpClient) {}
  
    getPresets() {
      return this.http.get<Preset[]>('http://localhost:3000/api/presets/');
    }
  }
  
