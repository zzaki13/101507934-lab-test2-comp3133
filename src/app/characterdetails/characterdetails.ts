import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api';
import { Character } from '../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css'
})
export class CharacterdetailsComponent implements OnInit {
  character = signal<Character | null>(null);
  loading = signal<boolean>(true);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.apiService.getCharacterById(id).subscribe({
        next: (data) => {
          this.character.set(data[0]);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    });
  }
}