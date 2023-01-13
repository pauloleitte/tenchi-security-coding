import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { ChartData } from '../../../../core/interface';
import { CharacterService } from './../../../../shared/services/character/character.service';
import { EpisodeService } from './../../../../shared/services/episode/episode.service';
import { LocationService } from './../../../../shared/services/location/location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  totalOfCharacters = 0;
  totalOfEpisodes = 0;
  totalOfLocations = 0;
  episodesCharacters: ChartData[] = [];
  locationsCharacters: ChartData[] = [];
  chartEpisode: any;
  chartLocation: any;

  constructor(
    private readonly characterService: CharacterService,
    private readonly episodeService: EpisodeService,
    private readonly locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getAllCharacters();
    this.getAllEpisodesCharacters();
    this.getAllLocationsCharacters();
  }

  getAllEpisodesCharacters(page: number = 1): void {
    this.subscriptions.push(
      this.episodeService.getAllEpisodes(page).subscribe((resp) => {
        this.totalOfEpisodes = resp.info.count;
        resp.results.forEach((episode) => {
          this.episodesCharacters.push({
            label: episode.id,
            total: episode.characters.length,
          });
        });
        if (resp.info.next != null && page < resp.info.pages) {
          this.getAllEpisodesCharacters(page + 1);
        } else {
          this.createEpisodeChart();
        }
      })
    );
  }

  getAllLocationsCharacters(page: number = 1): void {
    this.subscriptions.push(
      this.locationService.getAllLocations(page).subscribe((resp) => {
        this.totalOfLocations = resp.info.count;
        resp.results.forEach((location) => {
          this.locationsCharacters.push({
            label: location.id,
            total: location.residents.length,
          });
        });
        if (resp.info.next != null && page < resp.info.pages) {
          this.getAllLocationsCharacters(page + 1);
        } else {
          this.createLocationChart();
        }
      })
    );
  }

  getAllCharacters(): void {
    this.subscriptions.push(
      this.characterService.getAllCharacters().subscribe((resp) => {
        this.totalOfCharacters = resp.info.count;
      })
    );
  }

  createEpisodeChart(): void {
    this.chartLocation = new Chart('chartEpisode', {
      type: 'bar',
      data: {
        labels: this.episodesCharacters.map((data) => data.label),
        datasets: [
          {
            label: 'Characters',
            data: this.episodesCharacters.map((data) => data.total),
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createLocationChart(): void {
    this.chartEpisode = new Chart('chartLocation', {
      type: 'bar',
      data: {
        labels: this.locationsCharacters.map((data) => data.label),
        datasets: [
          {
            label: 'Characters',
            data: this.locationsCharacters.map((data) => data.total),
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
