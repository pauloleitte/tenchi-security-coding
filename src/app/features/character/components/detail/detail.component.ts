import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Episode } from 'src/app/core/interface';
import { CharacterService } from 'src/app/shared/services/chracter/character.service';
import { EpisodeService } from 'src/app/shared/services/episode/episode.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnDestroy {
  subcribes: Subscription[] = [];
  loading = true;
  idCharacter = '';
  character: Character;
  episodes: Episode[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly service: CharacterService,
    private readonly episodeService: EpisodeService
  ) {
    this.subcribes.push(
      this.route.params.subscribe((params) => {
        this.idCharacter = params['id'];
      })
    );
    this.subcribes.push(
      this.service
        .getSingleCharacter(Number(this.idCharacter))
        .subscribe((character) => {
          this.character = character;
          this.getEpisodes();
        })
    );
  }

  getEpisodes() {
    this.character.episode.forEach((url) => {
      const result = url.split('/');
      const id = result[result.length - 1];
      this.episodeService.getSingleEpisode(Number(id)).subscribe((episode) => {
        this.episodes.push(episode);
      });
    });
    this.loading = false;
  }

  onEpisodeClick(id: number){
    this.router.navigateByUrl(`episode/${id}`)
  }

  ngOnDestroy(): void {
    this.subcribes.forEach((sub) => sub.unsubscribe());
  }
}
