import { Routes } from '@angular/router';
import { CharacterlistComponent } from './characterlist/characterlist';
import { CharacterfilterComponent } from './characterfilter/characterfilter';
import { CharacterdetailsComponent } from './characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterlistComponent },
  { path: 'characters/house/:house', component: CharacterfilterComponent },
  { path: 'character/:id', component: CharacterdetailsComponent }
];