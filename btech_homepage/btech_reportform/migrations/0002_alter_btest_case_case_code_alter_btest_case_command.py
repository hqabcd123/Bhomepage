# Generated by Django 4.1.2 on 2022-10-17 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('btech_reportform', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='btest_case',
            name='Case_code',
            field=models.IntegerField(default='7H9M6ZGO52RY4O0R3UKW22QMIW1SSZ0V', unique=True),
        ),
        migrations.AlterField(
            model_name='btest_case',
            name='Command',
            field=models.TextField(blank=True),
        ),
    ]