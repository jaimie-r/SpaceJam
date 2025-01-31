# Generated by Django 5.1.1 on 2024-10-07 01:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('player_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('team_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='PlayerStats',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_starter', models.BooleanField(default=False)),
                ('minutes_played', models.FloatField()),
                ('points', models.IntegerField()),
                ('assists', models.IntegerField()),
                ('offensive_rebounds', models.IntegerField()),
                ('defensive_rebounds', models.IntegerField()),
                ('steals', models.IntegerField()),
                ('blocks', models.IntegerField()),
                ('turnovers', models.IntegerField()),
                ('defensive_fouls', models.IntegerField()),
                ('offensive_fouls', models.IntegerField()),
                ('free_throws_attempted', models.IntegerField()),
                ('free_throws_made', models.IntegerField()),
                ('two_pointers_attempted', models.IntegerField()),
                ('two_pointers_made', models.IntegerField()),
                ('three_pointers_attempted', models.IntegerField()),
                ('three_pointers_made', models.IntegerField()),
                ('shot_details', models.JSONField(default=list)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.game')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.player')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='away_team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='away_games', to='app.team'),
        ),
        migrations.AddField(
            model_name='game',
            name='home_team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='home_games', to='app.team'),
        ),
    ]
