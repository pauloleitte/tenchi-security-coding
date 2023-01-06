import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./features/character/character.module').then(
        (m) => m.CharacterModule
      ),
  },
  {
    path: 'episode',
    loadChildren: () =>
      import('./features/episode/episode.module').then((m) => m.EpisodeModule),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./features/location/location.module').then(
        (m) => m.LocationModule
      ),
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/home',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
