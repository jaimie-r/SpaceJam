export interface Shot {
    isMake: boolean;
    locationX: number;
    locationY: number;
  }
  
  export interface Game {
    date: string;  // Or Date if you plan to use Date objects
    isStarter: boolean;
    minutes: number;
    points: number;
    assists: number;
    offensiveRebounds: number;
    defensiveRebounds: number;
    steals: number;
    blocks: number;
    turnovers: number;
    defensiveFouls: number;
    offensiveFouls: number;
    freeThrowsMade: number;
    freeThrowsAttempted: number;
    twoPointersMade: number;
    twoPointersAttempted: number;
    threePointersMade: number;
    threePointersAttempted: number;
    shots: Shot[];
  }
  
  export interface PlayerSummary {
    name: string;
    games: Game[];
  }