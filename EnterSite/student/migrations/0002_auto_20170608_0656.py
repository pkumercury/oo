# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-08 06:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='editable',
            field=models.IntegerField(choices=[(0, '未提交'), (1, '已提交'), (2, '已放弃')], default=0),
        ),
    ]
