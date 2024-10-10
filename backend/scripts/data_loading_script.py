# NOTE: I implemented this in management/commands so you can run python manage.py runserver (port number) to run the server
import json
from django.core.management.base import BaseCommand
from app.models import Game, Player, Team, GamePlayerStats, Shots

class Command(BaseCommand):
    def handle(self, *args, **options):
               self.load_teams('/Users/jaimieren/Desktop/internship app code/technical-project-deadline-10-14-23-jaimie-r/backend/raw_data/teams.json')
               self.load_players('/Users/jaimieren/Desktop/internship app code/technical-project-deadline-10-14-23-jaimie-r/backend/raw_data/players.json')
               self.load_games('/Users/jaimieren/Desktop/internship app code/technical-project-deadline-10-14-23-jaimie-r/backend/raw_data/games.json')

    def load_teams(self, teams_file_path):
        with open(teams_file_path, 'r') as f:
            teams_data = json.load(f)
            for team_data in teams_data:
                Team.objects.get_or_create(id=team_data['id'], defaults={'name': team_data['name']})

    def load_players(self, players_file_path):
        with open(players_file_path, 'r') as f:
            players_data = json.load(f)
            for player_data in players_data:
                Player.objects.get_or_create(id=player_data['id'], defaults={'name': player_data['name']})

    def load_games(self, games_file_path):
        with open(games_file_path, 'r') as f:
            games_data = json.load(f)
            for game_data in games_data:
                # game_data['homeTeam']['id'] returns home team id
                # getting the team with this id and setting that to the home team
                home_team = Team.objects.get(id=game_data['homeTeam']['id']) 
                away_team = Team.objects.get(id=game_data['awayTeam']['id'])
                game, _ = Game.objects.get_or_create(
                    id=game_data['id'],
                    defaults={
                        'date': game_data['date'],
                        'home_team': home_team,
                        'away_team': away_team
                    }
                )

                for player_data in game_data['homeTeam']['players']:
                    self.create_player_stats(player_data, game, home_team)
                for player_data in game_data['awayTeam']['players']:
                    self.create_player_stats(player_data, game, away_team)

    def create_player_stats(self, player_data, game, team):
        player = Player.objects.get(id=player_data['id'])
        new_stats, _ = GamePlayerStats.objects.get_or_create(
            player=player,
            game=game,
            defaults={
                'is_starter': player_data['isStarter'],
                'minutes': player_data['minutes'],
                'points': player_data['points'],
                'assists': player_data['assists'],
                'offensive_rebounds': player_data['offensiveRebounds'],
                'defensive_rebounds': player_data['defensiveRebounds'],
                'steals': player_data['steals'],
                'blocks': player_data['blocks'],
                'turnovers': player_data['turnovers'],
                'defensive_fouls': player_data['defensiveFouls'],
                'offensive_fouls': player_data['offensiveFouls'],
                'free_throws_made': player_data['freeThrowsMade'],
                'free_throws_attempted': player_data['freeThrowsAttempted'],
                'two_pointers_made': player_data['twoPointersMade'],
                'two_pointers_attempted': player_data['twoPointersAttempted'],
                'three_pointers_made': player_data['threePointersMade'],
                'three_pointers_attempted': player_data['threePointersAttempted'],
            }
        )

        for shot_data in player_data['shots']:
            Shots.objects.create(
                player_stats=new_stats,
                is_made=shot_data['isMake'],
                location_x=shot_data['locationX'],
                location_y=shot_data['locationY']
            )