import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [CommonModule, SharedModule, LocationRoutingModule],
})
export class LocationModule {}
