import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription
} from 'rxjs';
import { Character } from 'src/app/core/interface';
import { CharacterService } from 'src/app/shared/services/chracter/character.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnDestroy {
  subcribes: Subscription[] = [];
  characters: Character[] = [];
  private readonly searchSubject = new Subject<string>();
  page = 1;

  constructor(
    private readonly router: Router,
    private readonly service: CharacterService
  ) {
    this.subcribes.push(
      this.service.getAllCharacters().subscribe((resp) => {
        this.characters = resp.results;
      })
    );

    this.subcribes.push(
      this.searchSubject
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(searchQuery => {
          this.service.getSingleCharacterByName(searchQuery).subscribe(resp => {
            this.characters = resp.results;
          })
        })
    );
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  onClickCard(id: number) {
    this.router.navigateByUrl(`character/${id}`);
  }

  onScroll(): void {
    this.service.getAllCharacters(++this.page).subscribe((resp) => {
      this.characters.push(...resp.results);
    });
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
