# Generated by Django 5.1.1 on 2024-10-08 02:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_gameplayerstats_team'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Shot',
            new_name='Shots',
        ),
        migrations.RenameField(
            model_name='gameplayerstats',
            old_name='minutes_played',
            new_name='minutes',
        ),
        migrations.RenameField(
            model_name='shots',
            old_name='is_make',
            new_name='is_made',
        ),
        migrations.RemoveField(
            model_name='gameplayerstats',
            name='team',
        ),
        migrations.AlterField(
            model_name='game',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='gameplayerstats',
            name='game',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.game'),
        ),
        migrations.AlterField(
            model_name='player',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='team',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
