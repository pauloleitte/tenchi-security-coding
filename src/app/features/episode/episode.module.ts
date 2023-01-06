import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';
import { EpisodeRoutingModule } from './episode-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EpisodeRoutingModule
  ]
})
export class EpisodeModule { }
