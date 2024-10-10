import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSummaryComponent } from './player-summary.component';
import { routing } from './player-summary.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../_services/players.service';

@NgModule({
  declarations: [PlayerSummaryComponent],
  imports: [
    CommonModule,
    routing,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [PlayersService],
  bootstrap: [PlayerSummaryComponent],
})
export class PlayerSummaryModule { }