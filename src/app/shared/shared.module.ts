import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';

const modules = [
  CommonModule,
  RouterModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatDialogModule,
  MatCardModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
];

const components = [NavComponent, FooterComponent];

@NgModule({
  declarations: [...components],
  exports: [...components, ...modules],
  imports: [...modules],
  providers: [],
})
export class SharedModule {}
