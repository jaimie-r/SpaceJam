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
  playerSummary: PlayerSummary;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {

  }

  ngOnInit(): void {
    // fetching playerID from the route params
    this.playersService.getPlayerSummary(1).pipe(untilDestroyed(this)).subscribe((data: PlayerSummary) => {
      // Assign the API response to the playerSummary property
      this.playerSummary = data;
      console.log(this.playerSummary);  // Log the full player summary data
    });
  }

  ngOnDestroy() {
  }

}