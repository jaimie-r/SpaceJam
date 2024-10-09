import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {PlayersService} from '../_services/players.service';
import { PlayerSummary } from './player-summary.interface';

@UntilDestroy()
@Component({
  selector: 'player-summary-component',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerSummaryComponent implements OnInit, OnDestroy {

  // Defining a property for player summary data using my PlayerSummary interface
  playerSummary: PlayerSummary | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {

  }

  ngOnInit(): void {
    // listens for changes in the URL
    this.activatedRoute.params.subscribe(params => {
      // extracts playerID from the URL
      const playerID = params['playerID'];
      if (playerID) {
        // if playerID exists in the URL, get player summary
        this.fetchPlayerSummary(playerID);
      }
    });
  }

  fetchPlayerSummary(playerID: number): void {
    // getPlayerSummary gets data from backend API
    // pipe ends the subscription so you quit listening to the URL
    // subscribe allows the component to use the playerSummary data
    this.playersService.getPlayerSummary(playerID).pipe(untilDestroyed(this)).subscribe((data: PlayerSummary) => {
      this.playerSummary = data;
      // log prints API response to browser's console
      console.log(data);
    });
  }

  ngOnDestroy() {
  }

}