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
@UntilDestroy()
@Component({
  selector: 'player-summary-component',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerSummaryComponent implements OnInit, OnDestroy {
  
  endpoint: any;
  apiResponse: any = {};
  playerID: number = 1;
  
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {
  }

  ngOnInit(): void {
    this.fetchApiResponse();
  }

  changeParams(): void {
    this.fetchApiResponse();
  }

  fetchApiResponse(): void {
    this.playersService.getPlayerSummary(this.playerID).pipe(untilDestroyed(this)).subscribe(data => {
      this.endpoint = data.endpoint;
      // data.apiResponse holds data from API call
      // store as JSON instead of JSON.stringify so you can iterate over it in the html
      this.apiResponse = data.apiResponse;
    });
  }

  ngOnDestroy() {
  }

  // Utility function to get all game data except 'shots' and 'date'
  getGameWithoutDateAndShots(game: any) {
    const { shots, date, ...gameWithoutDateAndShots } = game;
    return gameWithoutDateAndShots;
  }

  // Get the first 11 keys for the first table (excluding 'date')
  getFirstTableKeys(game: any): string[] {
    const keys = Object.keys(this.getGameWithoutDateAndShots(game));
    return keys.slice(0, 11);  // Get the first 11 keys
  }

  // Get the remaining keys for the second table
  getSecondTableKeys(game: any): string[] {
    const keys = Object.keys(this.getGameWithoutDateAndShots(game));
    return keys.slice(11);  // Get the keys after the first 11
  }

  // Get the values corresponding to the first 11 keys for the first table
  getFirstTableValues(game: any): any[] {
    const values = Object.values(this.getGameWithoutDateAndShots(game));
    return values.slice(0, 11);  // Get the first 11 values
  }

  // Get the values corresponding to the remaining keys for the second table
  getSecondTableValues(game: any): any[] {
    const values = Object.values(this.getGameWithoutDateAndShots(game));
    return values.slice(11);  // Get the values after the first 11
  }

  /**
   * Calculate the shot position on the court diagram.
   * x and y coordinates are in feet, with (0, 0) at the basket center.
   */
  getShotPosition(x: number, y: number): any {
    // scaling factors, factor of 0.7 because i changed the size of the image to be 
    const courtWidth = 1455 * 0.5;  // width of the court diagram in pixels
    const courtHeight = 1365 * 0.5; // height of the court diagram in pixels
    const basketX = 727 * 0.5;   // X-coordinate for the center of the basket
    const basketY = 1200 * 0.5;  // Y-coordinate for the center of the basket

    // Scale factors: adjust as needed to fit your image scaling
    const scaleX = courtWidth / 50;  // X-axis scale factor bc width is 50 ft
    const scaleY = courtHeight / 47;  // Y-axis scale factor bc height is 47 feet

    // Calculate pixel position relative to the basket center
    const posX = basketX + (x * scaleX);  // X position on the image
    const posY = basketY - (y * scaleY);  // Y position on the image (invert Y-axis)

    // Return the position as inline styles
    return {
      left: `${posX}px`,
      top: `${posY}px`
    };
  }
}