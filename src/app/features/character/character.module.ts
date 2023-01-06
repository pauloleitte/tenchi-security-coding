import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterRoutingModule } from './character-routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharacterRoutingModule
  ]
})
export class CharacterModule { }
