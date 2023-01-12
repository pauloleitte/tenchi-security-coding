import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription
} from 'rxjs';
import { Character } from 'src/app/core/interface';
import { CharacterService } from '../../../../shared/services/character/character.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  subcribes: Subscription[] = [];
  characters: Character[] = [];
  private readonly searchSubject = new Subject<string>();
  page = 1;

  constructor(
    private readonly router: Router,
    private readonly service: CharacterService
  ) {
    this.subcribes.push(
      this.searchSubject
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe((searchQuery) => {
          this.service.getCharactersByName(searchQuery).subscribe((resp) => {
            this.characters = resp.results;
          });
        })
    );
  }
  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.subcribes.push(
      this.service.getAllCharacters().subscribe((resp) => {
        this.characters = resp.results;
      })
    );
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  onClickCard(id: number): void {
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
