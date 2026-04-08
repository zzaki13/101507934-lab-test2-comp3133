import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api';
import { Character } from '../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css'
})
export class CharacterfilterComponent implements OnInit {
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  selectedHouse = '';
  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['house']) {
        this.selectedHouse = params['house'];
        this.filterByHouse(this.selectedHouse);
      }
    });
  }

  filterByHouse(house: string): void {
    this.loading.set(true);
    this.selectedHouse = house;
    this.apiService.getCharactersByHouse(house).subscribe({
      next: (data) => {
        this.characters.set(data.filter(c => c.image));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}