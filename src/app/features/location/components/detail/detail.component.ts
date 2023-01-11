import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Location } from '../../../../core/interface';
import { CharacterService } from '../../../../shared/services/character/character.service';
import { LocationService } from '../../../../shared/services/location/location.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  subcribes: Subscription[] = [];
  loading = true;
  idLocation = '';
  location: Location;
  residents: Character[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: LocationService,
    private readonly characterService: CharacterService
  ) {
    this.idLocation = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    this.subcribes.push(
      this.service
        .getSingleLocation(Number(this.idLocation))
        .subscribe((location) => {
          this.location = location;
          this.getCharacters();
        })
    );
  }

  onCharacterClick(id: number) {
    this.router.navigateByUrl(`/character/${id}`);
  }

  getCharacters() {
    this.location.residents.forEach((url: string) => {
      const result = url.split('/');
      const id = result[result.length - 1];
      this.characterService
        .getSingleCharacter(Number(id))
        .subscribe((character) => {
          this.residents.push(character);
        });
    });
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => sub.unsubscribe());
  }
}
