import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  }
  onClickCard(id: number) {
    this.router.navigateByUrl(`character/${id}`)
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
