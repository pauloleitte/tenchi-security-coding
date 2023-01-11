import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Episode } from '../../../../core/interface';
import { CharacterService } from '../../../../shared/services/character/character.service';
import { EpisodeService } from '../../../../shared/services/episode/episode.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  subcribes: Subscription[] = [];
  loading = true;
  idEpisode = '';
  episode: Episode;
  characters: Character[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: EpisodeService,
    private readonly characterService: CharacterService
  ) {
    this.idEpisode = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode() {
    this.subcribes.push(
      this.service
        .getSingleEpisode(Number(this.idEpisode))
        .subscribe((character) => {
          this.episode = character;
          this.getCharacters();
          this.loading = false;
        })
    );
  }

  onCharacterClick(id: number) {
    this.router.navigateByUrl(`/character/${id}`);
  }

  getCharacters() {
    this.episode.characters.forEach((url) => {
      const result = url.split('/');
      const id = result[result.length - 1];
      this.characterService
        .getSingleCharacter(Number(id))
        .subscribe((episode) => {
          this.characters.push(episode);
        });
    });
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => sub.unsubscribe());
  }
}
