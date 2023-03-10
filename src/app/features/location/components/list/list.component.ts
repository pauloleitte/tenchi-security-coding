import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription
} from 'rxjs';
import { Location } from '../../../../core/interface';
import { LocationService } from '../../../../shared/services/location/location.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  subcribes: Subscription[] = [];
  locations: Location[] = [];
  private readonly searchSubject = new Subject<string>();
  page = 1;

  constructor(
    private readonly router: Router,
    private readonly service: LocationService
  ) {
    this.subcribes.push(
      this.searchSubject
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((searchQuery) => {
          this.service
            .getLocationsByName(searchQuery)
            .subscribe((resp) => {
              this.locations = resp.results;
            });
        })
    );
  }
  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.subcribes.push(
      this.service.getAllLocations().subscribe((resp) => {
        this.locations = resp.results;
      })
    );
  }

  onClickCard(id: number): void {
    this.router.navigateByUrl(`location/${id}`);
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  onScroll(): void {
    this.service.getAllLocations(++this.page).subscribe((resp) => {
      this.locations.push(...resp.results);
    });
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
