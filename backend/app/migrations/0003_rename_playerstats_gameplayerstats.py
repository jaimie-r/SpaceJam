# Generated by Django 5.1.1 on 2024-10-07 03:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_remove_playerstats_shot_details_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PlayerStats',
            new_name='GamePlayerStats',
        ),
    ]
