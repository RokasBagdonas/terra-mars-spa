// for encapsulating data in input form
export class PlayerScore {
  player: Player = new Player();
  corporation: string = "";
  terraform_rating: number = 20;
  milestones: number = 0;
  awards: number = 0;
  greeneries: number = 0;
  cities: number = 0;
  event_cards: number = 0;
  automated_cards: number = 0;
  active_cards: number = 0;
  resources: number = 0;
  total_score: number = 0;
  is_winner: boolean = false;

  constructor() {
  };

}

export class Game {
  date: Date = new Date();
  game_map: string = "Tharsis";
  number_of_generations: number;
  draft_variant: boolean = false;
  prelude: boolean = false;
  venus_next: boolean = false;
  colonies: boolean = false;

  static pretifyDate(dateString: string){
    let date = new Date(Date.parse(dateString));
    let options = {"dateStyle": "medium", "timeStyle": "short"};
    // @ts-ignore
    return date.toLocaleString("lt-LT", options);
  }
}

export class Player {
  id: number = 0;
  nickname: string = "<none>";
  motto: string = "-.-";
  user: string = "";

  static playersToNicknameList(players: Array<Player>){
    let result = new Array<String>();
    for(let p of players){
      result.push(p.nickname);
    }
    return result;
  }
}

export class PlayerStats {
  id: number = 0;
  player: Player;
  games_played: number = 0;
  win_percentage: number = 0.0;
  most_popular_corporation: string = "<none>";
  average_number_of_players_in_games: number = 0.0;
  last_updated: Date;

  constructor(jsonObject = {}){
    Object.assign(this, jsonObject);
  }
}

export class GameScores {
  game: Game;
  scores: Array<PlayerScore> = [];

  constructor(jsonObject = {}){
    Object.assign(this, jsonObject);
  }

  static getWinner(gameScores : GameScores){
    let ps = gameScores.scores.filter(ps => ps.is_winner);
    if(!ps || ps.length === 0)
      return "no winner";
    return ps[0].player.nickname;
  }
}



