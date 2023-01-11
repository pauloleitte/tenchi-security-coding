import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription
} from 'rxjs';
import { Episode } from 'src/app/core/interface';
import { EpisodeService } from 'src/app/shared/services/episode/episode.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy {
  subcribes: Subscription[] = [];
  episodes: Episode[] = [];
  private readonly searchSubject = new Subject<string>();
  page = 1;

  constructor(
    private readonly router: Router,
    private readonly service: EpisodeService
  ) {
    this.subcribes.push(
      this.service.getAllEpisodes().subscribe((resp) => {
        this.episodes = resp.results;
      })
    );

    this.subcribes.push(
      this.searchSubject
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((searchQuery) => {
          this.service.getSingleEpisodeByName(searchQuery).subscribe((resp) => {
            this.episodes = resp.results;
          });
        })
    );
  }

  onClickCard(id: number) {
    this.router.navigateByUrl(`episode/${id}`);
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  onScroll(): void {
    this.service.getAllEpisodes(++this.page).subscribe((resp) => {
      this.episodes.push(...resp.results);
    });
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
