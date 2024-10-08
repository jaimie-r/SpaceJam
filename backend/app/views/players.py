# -*- coding: utf-8 -*-
import logging
from functools import partial
import json
import os

from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from app.dbmodels import models
from django.shortcuts import get_object_or_404

LOGGER = logging.getLogger('django')


class PlayerSummary(APIView):
    logger = LOGGER

    def get(self, request, playerID):
        """Return player data"""
        # Fetch player using playerID
        player = get_object_or_404(models.Player, id=playerID)

        # Fetch all game stats for the player
        game_stats = models.GamePlayerStats.objects.filter(player=player)

        # Initialize the response data structure
        response_data = {
            "name": player.name,
            "games": []
        }

        # Loop through game stats and construct response
        for game_stat in game_stats:
            game_data = {
                "date": game_stat.game.date,
                "isStarter": game_stat.is_starter,
                "minutes": game_stat.minutes,
                "points": game_stat.points,
                "assists": game_stat.assists,
                "offensiveRebounds": game_stat.offensive_rebounds,
                "defensiveRebounds": game_stat.defensive_rebounds,
                "steals": game_stat.steals,
                "blocks": game_stat.blocks,
                "turnovers": game_stat.turnovers,
                "defensiveFouls": game_stat.defensive_fouls,
                "offensiveFouls": game_stat.offensive_fouls,
                "freeThrowsMade": game_stat.free_throws_made,
                "freeThrowsAttempted": game_stat.free_throws_attempted,
                "twoPointersMade": game_stat.two_pointers_made,
                "twoPointersAttempted": game_stat.two_pointers_attempted,
                "threePointersMade": game_stat.three_pointers_made,
                "threePointersAttempted": game_stat.three_pointers_attempted,
                "shots": []
            }

            # Get shots for this game stat
            shots = models.Shots.objects.filter(player_stats=game_stat)
            for shot in shots:
                shot_data = {
                    "isMake": shot.is_made,
                    "locationX": shot.location_x,
                    "locationY": shot.location_y
                }
                game_data["shots"].append(shot_data)

            response_data["games"].append(game_data)

        # Return the response
        return Response(response_data)
