import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
// import {plainToClass} from 'class-transformer';

import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends BaseService {

  // BehaviorSubject to store player summary
  private playerSummarySubject = new BehaviorSubject<any>(null);
  
  constructor(protected http: HttpClient) {
    super(http);
  }

  // fetches data
  getPlayerSummary(playerID: number): Observable<any> {
    const endpoint = `${this.baseUrl}/playerSummary/${playerID}`;

    // this.http.get(endpoint) initiates get request to the endpoint
    // pipe allows chaining of RxJS operators (map and catchError)
    return this.http.get(endpoint).pipe(
      // map() transforms the response data
      // data = API response
      map((data: any) => {
        // playerSummaryData is onjected that stores endpoint and response data
        const playerSummaryData = {
          endpoint: endpoint,
          apiResponse: data
        };
        // Update playerSummarySubject with the fetched data, so it's available to its subscribers
        this.playerSummarySubject.next(playerSummaryData.apiResponse);
        return playerSummaryData;
      }),
      catchError((error) => {
        console.error('Error fetching player summary:', error);
        throw error;
      })
    );
  }

  // gets the current player summary
  getPlayerSummaryData(): Observable<any> {
    return this.playerSummarySubject.asObservable(); // Return the observable of the BehaviorSubject
  }
}