import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api';
import { Character } from '../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class CharacterlistComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data.filter(c => c.image));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load characters');
        this.loading.set(false);
      }
    });
  }
}